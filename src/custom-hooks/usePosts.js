"use client";
import constants from "@/constants";
import { useState } from "react";
import useSWR from "swr";

/**
 * Function to fetch data from the specified URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 * Custom hook for fetching and managing posts.
 *
 * @returns {{
 *   posts: Array,
 *   isLoading: boolean,
 *   isError: Error,
 *   goToPage: function,
 *   setSearchTerm: function,
 *   searchTerm: string
 * }} - Object containing posts data, loading state, error state, and functions for page navigation and search.
 */
export function usePosts() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Build the query parameters based on page and search term
  let params = `?_page=${page}&_limit=10`;
  params += searchTerm ? `&title=${searchTerm}` : "";

  // Fetch posts data using SWR
  const { data, error } = useSWR(constants.API_URL + params, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    goToPage: (newPage) => setPage(newPage),
    setSearchTerm,
    searchTerm,
  };
}
