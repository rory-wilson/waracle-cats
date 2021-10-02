import { get, post, del } from "./httpClient";
import {
  postImage,
  getImages,
  getFavourites,
  getVotes,
  postFavourite,
  deleteFavourite,
  postVote,
} from "./api";

jest.mock("./httpClient", () => ({
  get: jest.fn(() => Promise.resolve({ headers: {}, data: {} })),
  post: jest.fn(),
  del: jest.fn(),
}));

process.env.USER_ID = "test-user";

describe("api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("postImage calls the correct url", async () => {
    const data = new FormData();
    await postImage(data);
    expect(post).toHaveBeenCalled();
    expect(post).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/images/upload",
      payload: data,
    });
  });

  test("getImages calls the correct url", async () => {
    await getImages(12, 1);
    expect(get).toHaveBeenCalled();
    expect(get).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/images?limit=12&page=1",
    });
  });

  test("postFavourite calls the correct url", async () => {
    await postFavourite("12345");
    expect(post).toHaveBeenCalled();
    expect(post).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/favourites",
      payload: { image_id: "12345", sub_id: "test-user" },
    });
  });

  test("deleteFavourite calls the correct url", async () => {
    await deleteFavourite("12345");
    expect(del).toHaveBeenCalled();
    expect(del).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/favourites/12345",
    });
  });

  test("getFavourites calls the correct url", async () => {
    await getFavourites();
    expect(get).toHaveBeenCalled();
    expect(get).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/favourites?sub_id=test-user",
    });
  });

  test("getVotes calls the correct url", async () => {
    await getVotes();
    expect(get).toHaveBeenCalled();
    expect(get).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/votes",
    });
  });

  test("postVote calls the correct url", async () => {
    await postVote("12345", true);
    expect(post).toHaveBeenCalled();
    expect(post).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/votes",
      payload: { image_id: "12345", value: 1 },
    });

    await postVote("12345", false);
    expect(post).toHaveBeenCalledWith({
      url: "https://api.thecatapi.com/v1/votes",
      payload: { image_id: "12345", value: 0 },
    });
  });
});
