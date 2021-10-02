import React, { useState, useEffect } from "react";
import { Loading, GalleryImage } from "./";
import { getGalleryImages } from "../services/gallery";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const images = await getGalleryImages();
        setImages(images);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Loading loading={isLoading} />
      <div className="row">
        {images.map((image) => (
          <div className="col-lg-3 col-md-4 mb-3" key={image.id}>
            <GalleryImage image={image} />
          </div>
        ))}
      </div>
    </>
  );
};
