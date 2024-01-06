"use client";

import { useState } from "react";

/**
 * Custom hook for handling pagination.
 *
 * @param {number} initialPage - The initial page number.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @param {function} goToPage - Callback function to perform actions when the page changes.
 * @returns {{
 *   currentPage: number,
 *   totalPages: number,
 *   itemsPerPage: number,
 *   setItemsPerPage: function,
 *   handlePageChange: function
 * }} - Object containing pagination state and functions.
 */
export function usePagination(initialPage = 1, itemsPerPage = 10, goToPage) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPageState, setItemsPerPage] = useState(itemsPerPage);
  const [totalItems, setTotalItems] = useState(100); // 100 because we are not getting the total items or total pages from the API

  const totalPages = Math.ceil(totalItems / itemsPerPageState);

  /**
   * Function to handle page changes.
   *
   * @param {number} page - The target page number.
   * @returns {void}
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Callback function to perform actions when the page changes
    goToPage(page);
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage: itemsPerPageState,
    setItemsPerPage,
    handlePageChange,
  };
}
