import React, { useState } from "react";
import { EmptyHeart, FiledHeart, ThumbsDown, ThumbsUp } from "../images/icons";
import { postFavourite, deleteFavourite, postVote } from "../services/api";
import { IconButton } from "./";
import { GalleryImage } from "../services/types";

type Props = {
  image: GalleryImage;
};

export default ({ image }: Props) => {
  const [thisImage, setThisImage] = useState(image);

  const onVoteEvent = async (
    event: React.MouseEvent<HTMLButtonElement>,
    up: boolean
  ) => {
    event.preventDefault();
    try {
      await postVote(image.id, up);
      const voteCount = up ? thisImage.voteCount + 1 : thisImage.voteCount - 1;
      setThisImage({ ...thisImage, voteCount });
    } catch (e) {
      console.error(e);
    }
  };

  const onFavouriteToggle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    favouriteId: string
  ) => {
    event.preventDefault();
    try {
      if (!favouriteId) {
        const response = await postFavourite(image.id);
        setThisImage({ ...thisImage, favouriteId: response.id });
      } else {
        await deleteFavourite(favouriteId);
        setThisImage({ ...thisImage, favouriteId: null });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card">
      <img
        src={thisImage.url}
        className="card-img-top img-fluid"
        alt="Picture of a cat"
      />
      <div className="card-body">
        <div className="btn-group" role="group" aria-label="Basic example">
          <IconButton
            title={thisImage.favouriteId ? "Unfavourite" : "Favourite"}
            onClick={(e) => onFavouriteToggle(e, thisImage.favouriteId)}
            icon={thisImage.favouriteId ? <FiledHeart /> : <EmptyHeart />}
          />
          <IconButton
            title="Vote for this cat"
            onClick={(e) => onVoteEvent(e, true)}
            icon={<ThumbsUp />}
          />
          <IconButton
            title="Vote against this cat"
            onClick={(e) => onVoteEvent(e, false)}
            icon={<ThumbsDown />}
          />
        </div>
        <span>{thisImage.voteCount} votes</span>
      </div>
    </div>
  );
};
