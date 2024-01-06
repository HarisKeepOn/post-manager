import useSinglePost from "@/custom-hooks/useSinglePost";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "react-feather";

export const metadata = {
  title: "Posts Manager - Explore and Manage Single Post",
  description:
    "Discover detailed information about a single post with the Posts Manager. Explore and manage your posts effortlessly. View user ID, post ID, title, and body. Your central hub for organized and accessible post details.",
};

export default async function page({ params: { slug } }) {
  const postData = await useSinglePost(slug);

  return (
    <main>
      <div className="flex flex-col justify-center items-center justify-content-center">
        <div className="flex items-center text-center ">
          {postData === null && (
            <Link href="/">
              <ArrowLeft size={25} className="hover:text-grey mr-1" />
            </Link>
          )}
          <h1 className="text-3xl font-bold text-white-900 my-8">
            Posts Manager
          </h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {postData === null ? (
            <div className="m-8 p-4 rounded text-red-500 bg-red-100">
              Post Not Found
            </div>
          ) : (
            <div className="m-8 p-4 rounded text-blue-500 bg-blue-100">
              <div className="flex justify-start items-center text-center w-full mb-2">
                <Link href="/">
                  <ArrowLeft
                    size={25}
                    className="text-blue-500  hover:text-black bg-blue-100"
                  />
                </Link>
                <h1 className="text-3xl font-bold text-white-900 ml-2">Post</h1>
              </div>
              <div>
                <div className="flex flex-col justify-start">
                  <h2 className=" font-medium">
                    User ID :
                    <strong className="text-blue-500 ml-1">
                      {postData.userId}
                    </strong>
                  </h2>
                  <h2 className="font-medium">
                    Post ID :
                    <strong className="text-blue-500 ml-1">
                      {postData.id}
                    </strong>
                  </h2>
                  <p className="text-2xl font-bold mt-2">
                    Title : {postData.title}
                  </p>
                  <p className="text-gray-500">{postData.body}</p>
                </div>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}
