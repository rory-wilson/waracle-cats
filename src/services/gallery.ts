import { getImages, getVotes, getFavourites } from "./api";
import { GalleryImage } from "./types";

const calculateVotesForImage = (votes, imageId): number => {
  const countVotes = (val) =>
    votes.filter((v) => v.image_id === imageId && v.value === val).length;

  return countVotes(1) - countVotes(0);
};

const getFavouriteIdForImage = (favourites, imageId): string => {
  const favourite = favourites.find((f) => f.image_id === imageId);
  return favourite ? favourite.id : null;
};

export const getGalleryImages = async (
  pageSize: number,
  page: number
): Promise<{ count: number; images: GalleryImage[] }> => {
  try {
    const { count, images } = await getImages(pageSize, page);
    const votes = await getVotes();
    const favourites = await getFavourites();

    return {
      count,
      images: images.map((image) => ({
        ...image,
        voteCount: calculateVotesForImage(votes, image.id),
        favouriteId: getFavouriteIdForImage(favourites, image.id),
      })),
    };
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};
