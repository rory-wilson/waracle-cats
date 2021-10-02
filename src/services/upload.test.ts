import { validateFile } from "./upload";

describe("upload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("validateFile returns the correct error message for an empty file", async () => {
    const result = validateFile(null);
    expect(result).toEqual("Please choose a picture of your cat to upload");
  });

  test("validateFile returns the correct error message for the wrong file type", async () => {
    const result = validateFile({
      type: "banana",
      size: 0,
      arrayBuffer: null,
      slice: null,
      text: null,
      stream: null,
    });
    expect(result).toEqual("File should be either a JPG or PNG");
  });

  test("validateFile returns the correct error message for a large file", async () => {
    const result = validateFile({
      type: "image/jpeg",
      size: 10000000000000,
      arrayBuffer: null,
      slice: null,
      text: null,
      stream: null,
    });
    expect(result).toEqual("File should smaller than 10MB");
  });

  test("validateFile returns null for a valid file", async () => {
    const result = validateFile({
      type: "image/jpeg",
      size: 1000,
      arrayBuffer: null,
      slice: null,
      text: null,
      stream: null,
    });
    expect(result).toEqual(null);
  });
});
