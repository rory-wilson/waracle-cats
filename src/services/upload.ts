import { postImage } from "./api";

export const validateFile = (file: Blob): string => {
  if (!file) {
    return "Please choose a picture of your cat to upload";
  }
  if (file.type !== "image/png" && file.type !== "image/jpeg") {
    return "File should be either a JPG or PNG";
  }
  if (file.size / 1024 / 1024 > 10) {
    return "File should smaller than 10MB";
  }
  return null;
};

export const uploadFile = async (file: Blob): Promise<boolean> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    await postImage(formData);
    return true;
  } catch (e) {
    console.error(e);
    throw Error(e);
  }
};
