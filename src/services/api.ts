import { get, post, del } from "./httpClient";
import { Image, Vote, Favourite } from "./types";

export const postImage = (data: FormData): Promise<FormData> =>
  post<FormData>({
    url: "https://api.thecatapi.com/v1/images/upload",
    payload: data,
  });

export const getImages = (): Promise<Image[]> =>
  get<Image[]>({
    url: "https://api.thecatapi.com/v1/images?limit=12",
  });

export const getFavourites = (): Promise<Favourite[]> =>
  get<Favourite[]>({
    url: `https://api.thecatapi.com/v1/favourites?sub_id=${process.env.USER_ID}`,
  });

export const postFavourite = (image_id: string): Promise<Favourite> =>
  post<Favourite>({
    url: "https://api.thecatapi.com/v1/favourites",
    payload: { image_id, sub_id: process.env.USER_ID },
  });

export const deleteFavourite = (id: string): Promise<Favourite> =>
  del<Favourite>({ url: `https://api.thecatapi.com/v1/favourites/${id}` });

export const postVote = (image_id: string, up: boolean): Promise<Vote> =>
  post<Vote>({
    url: "https://api.thecatapi.com/v1/votes",
    payload: { image_id, value: up ? 1 : 0 },
  });

export const getVotes = (): Promise<Vote[]> =>
  get<Vote[]>({ url: `https://api.thecatapi.com/v1/votes` });
