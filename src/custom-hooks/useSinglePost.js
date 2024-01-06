import constants from "@/constants";
import { cache } from "react";
/**
 * Custom hook for fetching a single post by slug.
 *
 * @param {string} slug - The unique identifier for the post.
 * @returns {Promise<Object|null>} - A promise that resolves to the fetched post data or null if not found.
 */
const useSinglePost = cache(async (slug) => {
  try {
    const res = await fetch(`${constants.API_URL}/${slug}`, {
      next: {
        revalidate: false,
      },
    });
    if (res.status !== 200) {
        return null;
    }
    return res.json();
  } catch (err) {
    return null;
  }
});

export default useSinglePost;
