import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

export default function Pagination({ count, setCurrent }) {
  const navHandler = ({ selected }) => {
    setCurrent(selected + 1);
  };
  return (
    <ReactPaginate
      previousLabel={"pre"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={count / 5}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={navHandler}
      containerClassName={styles.container}
      previousLinkClassName={styles.previousLink}
      nextLinkClassName={styles.nextLink}
      activeClassName={styles.active}
      page
    />
  );
}
