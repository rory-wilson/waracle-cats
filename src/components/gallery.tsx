import React, { useState, useEffect } from "react";
import { Loading, GalleryImage, Pagination } from "./";
import { getGalleryImages } from "../services/gallery";

const PAGE_SIZE = 8;

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { count, images } = await getGalleryImages(
          PAGE_SIZE,
          currentPage
        );
        setImages(images);
        setCount(count);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

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
      {count > PAGE_SIZE && (
        <Pagination
          pageCount={Math.round(count / PAGE_SIZE)}
          currentPage={currentPage}
          onPageClick={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </>
  );
};
