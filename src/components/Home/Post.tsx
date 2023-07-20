"use client";

import { useState, useEffect, useRef, FC, LegacyRef } from "react";

import "./post.css";
import axiosInstanceBackend from "@/axios";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import DeleteModal from "../DeleteModal";
import Button4 from "../ui/Button4";
import Comment from "../Comment";

interface pageProps {
  sentPost?: PostModelType;
  postId?: string;
}

const Post: FC<pageProps> = ({ sentPost, postId }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [deleteCommentLoader, setDeleteCommentLoader] = useState<string[] | []>(
    []
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [selfPost, setSelfPost] = useState<boolean>(false);
  const [post, setPost] = useState<PostModelType | null>(
    sentPost ? sentPost : null
  );
  const [likePostAction, setLikePostAction] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const [commentString, setCommentString] = useState<string>("");

  const [commentErrorMessage, setCommentErrorMessage] =
    useState<string>("default");

  const commentTextAreaRef: LegacyRef<HTMLTextAreaElement> | null =
    useRef(null);

  const getPost = async () => {
    try {
      if (!postId) {
        postId = post?._id;
      }

      const response = await axiosInstanceBackend.get(
        `/post/getpost/${postId}`
      );

      setImageUrl(response.data.post.imageUrl);

      setPost(response.data.post);

      if (response.data.post.likes.includes(session.data?.user?.email)) {
        setIsLiked(true);
      }

      if (session.data?.user?.email === response.data.post.userEmail) {
        setSelfPost(true);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const updateLike = async () => {
    try {
      await axiosInstanceBackend.put(
        `/post/likepost/${session.data?.user?.email}/${post?._id}`
      );
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const addComment = async () => {
    setIsLoading(true);

    if (!commentString) {
      setCommentErrorMessage("Please add a comment");
      return setIsLoading(false);
    }

    try {
      const info = {
        comment: commentString,
      };

      const response = await axiosInstanceBackend.post(
        `/post/addcomment/${session.data?.user?.email}/${post?._id}`,
        info,
        {}
      );

      const rawPost: PostModelType = response.data.post;

      setPost(rawPost);

      setCommentString("");

      setIsInputFocused(false);
      setIsLoading(false);
      setShowCheckmark(true);

      setTimeout(() => {
        setShowCheckmark(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (session.data?.user?.email) {
      getPost();
    }
  }, [session.data]);

  if (!session.data) return <h1>Loading</h1>;

  return (
    <div className="col-span-10 font-head flex flex-col items-center ">
      {deleteModalOpen && (
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          postId={(postId ? postId : post?._id) as string}
        />
      )}
      <div
        className={`mx-auto  relative flex flex-col justify-center pt-8  border-[#c4dfec] ${
          sentPost ? "w-[450px]" : "w-[600px]"
        } `}
      >
        <Link href={`/profile/${post?.username}`}>
          <b>{post?.username}</b>
        </Link>
        <div className="mt-4 max-w-[600px] object-contain flex flex-row justify-center">
          {sentPost ? (
            <Link href={`/post/${post?._id}`}>
              <img
                loading="lazy"
                id="imageDiv"
                src={imageUrl}
                alt="Post Image"
                className=" max-h-[600px] object-contain"
              />
            </Link>
          ) : (
            <>
              {/* Delete button if own post */}
              <div className=" relative">
                {selfPost && (
                  <div
                    className={` absolute top-2 right-2 flex opacity-100 cursor-pointer border-2 hover:border-[#4CADDA] border-white bg-[#58c1de] h-8 w-8 flex-row justify-center items-center rounded-full transition-all duration-150 ease-in hover:bg-[#4CADDA] ${
                      (isLoading || showCheckmark) && "hidden"
                    }`}
                  >
                    <span
                      className="text-white"
                      onClick={() => {
                        setDeleteModalOpen(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </div>
                )}
                <img
                  src={imageUrl}
                  className="max-h-[600px] object-contain"
                  alt="Post Image"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row">
          <button
            className={`box self-start w-1/3 ${
              sentPost ? "h-10" : "h-12"
            }  cursor-pointer flex flex-row items-center justify-center`}
            onClick={() => {
              if (!isLiked) {
                setLikePostAction((prev) => !prev);
                setTimeout(() => {
                  setLikePostAction((prev) => !prev);
                }, 50);
              }
              setIsLiked((prev) => !prev);
              updateLike();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              className={` ${sentPost ? "h-8 w-10" : "h-10 w-12"}  ${
                likePostAction && "scale-[1.17]"
              }  transform-all duration-75 ease-in-out 	`}
              fill={`${isLiked ? "#4CADDA" : "#ffffff"}`}
            >
              <path
                stroke={`${isLiked ? "#4CADDA" : "black"}`}
                className="transform-all duration-50 ease-linear"
                strokeWidth="45"
                d="M721 936H254V424l278-288 33 26q11 8 14.5 18t3.5 23v10l-45 211h322q23 0 41.5 18.5T920 484v82q0 11-2.5 25.5T910 617L794 885q-9 21-29.5 36T721 936ZM194 424v512H80V424h114Z"
              />
            </svg>
          </button>
        </div>
        {!sentPost && (
          <div className="pt-6 px-2 flex flex-col gap-1 ">
            {/* Add Comment Section */}
            <div className="flex flex-row justify-between">
              {/* Comment Input fields */}

              <div className=" w-3/4">
                <textarea
                  ref={commentTextAreaRef}
                  id="inputTextArea"
                  className={`${
                    isInputFocused ? "h-20" : `h-8`
                  } border-b-2 border-blue-500 w-full outline-none`}
                  value={commentString}
                  onChange={(e) => {
                    setCommentString(e.target.value);
                    setCommentErrorMessage("default");
                  }}
                  onFocus={() => {
                    setIsInputFocused(true);
                  }}
                  onBlur={() => !commentString && setIsInputFocused(false)}
                  placeholder="Add a comment"
                />
                <p
                  className={`${
                    commentErrorMessage !== "default" ? "block" : "invisible"
                  } text-red-500 text-sm leading-3`}
                >
                  {commentErrorMessage}
                </p>
              </div>

              <Button4
                isLoading={isLoading}
                showCheckmark={showCheckmark}
                text="Comment"
                onClick={addComment}
                className=" relative  h-10 w-24 font-medium group flex flex-row items-center justify-center "
              />
            </div>

            {/* Comment Section */}
            <div className="pt-2 flex flex-col gap-3">
              {post?.comments
                ?.map((comment, id) => (
                  <Comment
                    key={id}
                    comment={comment}
                    post={post}
                    deleteCommentLoader={deleteCommentLoader}
                    email={session.data.user?.email!}
                    setDeleteCommentLoader={setDeleteCommentLoader}
                    setPost={setPost}
                  />
                ))
                .reverse()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
