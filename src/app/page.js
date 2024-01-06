"use client";
import CustomPagination from "@/components/CustomPagination";
import Constants from "@/constants";
import { usePagination } from "@/custom-hooks/usePagination";
import { usePosts } from "@/custom-hooks/usePosts";
import { isPostSaved, removePost, savePost, truncateText } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, RefreshCcw, Search, Trash } from "react-feather";

export default function Home() {
  const { posts, isLoading, isError, goToPage, setSearchTerm, searchTerm } =
    usePosts();

  const { currentPage, totalPages, handlePageChange } = usePagination(
    1,
    10,
    goToPage
  );

  const [searchTermState, setSearchTermState] = useState(searchTerm ?? "");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isLoading && posts && posts.length > 0) {
      const fetchedPosts = posts ?? [];
      const postsInStorage = JSON.parse(
        localStorage.getItem(Constants.POSTS_STORAGE_KEY)
      );
      if (postsInStorage) {
        // map through the data and if the post is saved, set the isPostSaved property to true otherwise set it to false
        const updatedPosts = fetchedPosts.map((post) => {
          const isPostSaved = postsInStorage.some(
            (item) => item.id === post.id
          );
          return { ...post, isPostSaved };
        });
        setData(updatedPosts);
      } else {
        setData(fetchedPosts);
      }
    } else {
      setData([]);
    }
  }, [posts]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white-900 mb-4">Posts Manager</h1>
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full mb-2">
          <Link
            className="px-3 py-3 rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white
              bg-blue-100 mr-4"
            href="/bookmarks"
          >
            <span className=" text-sm font-medium">View Bookmarked Posts</span>
          </Link>

          <div className="flex justify-end   items-center gap-2">
            <input
              type="text"
              placeholder="Enter exact Title (case sensitive) to search"
              value={searchTermState}
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 w-96"
              onChange={(e) => setSearchTermState(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setSearchTerm(searchTermState);
                }
              }}
            />
            <button
              className="px-3 py-3 rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white 
              bg-blue-100"
              onClick={(e) => {
                e.preventDefault();
                setSearchTerm(searchTermState);
              }}
            >
              <Search size={16} />
            </button>

            <button
              className="px-3 py-3 rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white 
              bg-blue-100"
              onClick={(e) => {
                e.preventDefault();
                setSearchTerm("");
                setSearchTermState("");
              }}
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="text-white-500">Loading...</span>
          </div>
        ) : isError ? (
          <p className="text-center text-red-500 bg-red-100 px-3 py-2 rounded">
            An error has occurred.
          </p>
        ) : data.length === 0 ? (
          <p className="text-center text-white-500">No Posts Available</p>
        ) : (
          <>
            <table className="w-full border-collapse divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg items-start">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Body
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-center w-20">
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {isPostSaved(item.id, data) ? (
                            <Bookmark
                              size={16}
                              className="mr-1 text-green-500"
                            />
                          ) : null}
                          <span
                            className={`${
                              isPostSaved(item.id, data)
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          >
                            {item.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 w-96">
                      <Link href={`/${item.id}`}>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900 hover:text-blue-500 cursor-pointer">
                            {item.title}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="ml-2">
                        <div className="text-sm text-gray-500 overflow-ellipsis overflow-hidden">
                          {truncateText(item.body, 40)}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 w-40">
                      {isPostSaved(item.id, data) ? (
                        <button
                          className="text-red-500 hover:text-red-700 flex items-center bg-red-100 px-2 py-1 rounded ml-2"
                          onClick={() => removePost(item.id, data, setData)}
                        >
                          <Trash size={16} />
                          <span className="ml-1 text-sm font-medium">
                            Unbookmark
                          </span>
                        </button>
                      ) : (
                        <button
                          className="text-blue-500 hover:text-blue-700 flex items-center bg-blue-100 px-2 py-1 rounded ml-2"
                          onClick={() => savePost(item, data, setData)}
                        >
                          <Bookmark size={16} />
                          <span className="ml-1 text-sm font-medium">
                            Bookmark
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <CustomPagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              startIndex={Math.max(currentPage - 1, 1)}
              endIndex={Math.min(currentPage + 1, totalPages)}
              totalPages={totalPages}
              searchTerm={searchTerm}
            />
          </>
        )}
      </div>
    </main>
  );
}
