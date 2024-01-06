"use client";
import CustomPagination from "@/components/CustomPagination";
import Constants from "@/constants";
import { truncateText, unBookmarkPost } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Trash } from "react-feather";

export const metadata = {
  title: "Bookmarked Posts - Posts Manager",
  description:
    "Explore and manage your bookmarked posts effortlessly with the Posts Manager. Unbookmark posts, view details, and navigate seamlessly through your saved content. Your central hub for organized and accessible bookmarked posts.",
};

function Bookmarks() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const postsInStorage = JSON.parse(
      localStorage.getItem(Constants.POSTS_STORAGE_KEY)
    );
    if (postsInStorage) {
      const totalItems = postsInStorage.length;
      setTotalPages(Math.ceil(totalItems / Constants.ITEMS_PER_PAGE));
      setData(
        postsInStorage.slice(
          (currentPage - 1) * Constants.ITEMS_PER_PAGE,
          currentPage * Constants.ITEMS_PER_PAGE
        )
      );
    } else {
      setData([]);
    }
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white-900 mb-4">Posts Manager</h1>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className="flex items-center gap-2">
            <Link className="px-3 py-3 rounded cursor-pointer " href="/">
              <ArrowLeft size={16} />
            </Link>
            <h3 className="text-xl font-bold text-white-900">Bookmarks</h3>
          </div>

          {data && data.length > 0 && (
            <button
              className="px-3 py-3 rounded cursor-pointer text-red-500 hover:bg-red-900 hover:text-white
              bg-red-100 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem(Constants.POSTS_STORAGE_KEY);
                setData([]);
              }}
            >
              <Trash size={16} />
              <span className="ml-1 text-sm font-medium">
                Remove All Bookmarks
              </span>
            </button>
          )}
        </div>

        {data.length === 0 ? (
          <p className="text-center text-white-500">No Bookmarks Saved</p>
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
                          <Bookmark size={16} className="mr-1 text-green-500" />
                          <span className="text-green-500">{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 w-96">
                      <div className="ml-2">
                        <Link href={`/${item.id}`}>
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900 hover:text-blue-500 cursor-pointer">
                              {item.title}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="ml-2">
                        <div className="text-sm text-gray-500 overflow-ellipsis overflow-hidden">
                          {truncateText(item.body, 40)}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 w-40">
                      <button
                        className="text-red-500 hover:text-red-700 flex items-center bg-red-100 px-2 py-1 rounded ml-2"
                        onClick={() => unBookmarkPost(item.id, data, setData)}
                      >
                        <Trash size={16} />
                        <span className="ml-1 text-sm font-medium">
                          Unbookmark
                        </span>
                      </button>
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
              searchTerm={""}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default Bookmarks;
