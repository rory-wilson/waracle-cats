import React from "react";

type Props = {
  pageCount: number;
  currentPage: number;
  onPageClick: (page: number) => void;
};

export default ({ pageCount, currentPage, onPageClick }: Props) => (
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageClick(currentPage - 1);
          }}
        >
          Previous
        </a>
      </li>

      {[...Array(pageCount).keys()].map((page) => (
        <li className={`page-item ${page === currentPage ? "active" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageClick(page);
            }}
          >
            {page + 1}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageClick(currentPage + 1);
          }}
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
);
