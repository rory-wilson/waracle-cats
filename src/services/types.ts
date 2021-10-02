export type Image = {
  id: string;
  url: string;
  sub_id: string;
};

export type Favourite = {
  id?: string;
  image_id: string;
  sub_id: string;
};

export type Vote = {
  id?: string;
  image_id: string;
  sub_id?: string;
  value: number;
};

export type GalleryImage = {
  id: string;
  url: string;
  sub_id: string;
  voteCount: number;
  favouriteId?: string;
};
