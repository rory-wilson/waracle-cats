import { getImages, getVotes, getFavourites } from "./api";
import { getGalleryImages } from "./gallery";

jest.mock("./api", () => ({
  getImages: jest.fn(() =>
    Promise.resolve({
      count: 10,
      images: [
        {
          id: "1",
          url: "www.test.com",
        },
        {
          id: "2",
          url: "www.test.com",
        },
      ],
    })
  ),
  getVotes: jest.fn(() =>
    Promise.resolve([
      {
        image_id: "1",
        value: 1,
      },
      {
        image_id: "1",
        value: 1,
      },
      {
        image_id: "1",
        value: 0,
      },
    ])
  ),
  getFavourites: jest.fn(() =>
    Promise.resolve([
      {
        id: "favourite-1",
        image_id: "2",
      },
    ])
  ),
}));

describe("gallery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getGalleryImages combines images, votes and favourites", async () => {
    const result = await getGalleryImages(12, 1);
    expect(getImages).toHaveBeenCalledTimes(1);
    expect(getVotes).toHaveBeenCalledTimes(1);
    expect(getFavourites).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      count: 10,
      images: [
        {
          id: "1",
          url: "www.test.com",
          voteCount: 1,
          favouriteId: null,
        },
        {
          id: "2",
          url: "www.test.com",
          voteCount: 0,
          favouriteId: "favourite-1",
        },
      ],
    });
  });
});
