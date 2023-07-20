import { Dispatch, FC, SetStateAction } from "react";
import Button5 from "./ui/Button5";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstanceBackend from "@/axios";
import { Session } from "next-auth";

interface CommentProps {
  comment: CommentModel;
  post: PostModelType;
  deleteCommentLoader: string[];
  email: string;
  setDeleteCommentLoader: Dispatch<SetStateAction<string[] | []>>;
  setPost: Dispatch<SetStateAction<PostModelType | null>>;
}

const Comment: FC<CommentProps> = ({
  comment,
  deleteCommentLoader,
  post,
  email,
  setDeleteCommentLoader,
  setPost,
}) => {
  const updateDeleteCommentLoader = (id: string) => {
    deleteCommentLoader as string[];
    if ((deleteCommentLoader as string[]).includes(id)) {
      setDeleteCommentLoader((prev) => {
        const tempDeleteCommentLoader = prev;
        tempDeleteCommentLoader.filter((loaderId: string) => loaderId !== id);
        return tempDeleteCommentLoader;
      });
    } else {
      setDeleteCommentLoader((prev) => [...prev, id]);
    }
  };

  const deleteComment = async (commentId: string) => {
    updateDeleteCommentLoader(commentId);

    try {
      const response = await axiosInstanceBackend.delete(
        `/post/deletecomment/${commentId}/${post?._id}`
      );

      setPost(response.data.post);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      updateDeleteCommentLoader(commentId);
    }
  };

  return (
    <div className=" flex flex-row gap-[10px] items-center">
      <p className="font-semibold text-md self-start justify-start">
        {comment.username}
      </p>
      <div>
        <p className="text-sm">{comment.comment}</p>

        <Button5
          comment={comment}
          deleteCommentLoader={deleteCommentLoader}
          onClick={() => deleteComment(comment._id)}
          className={`h-4 w-8 text-xs text-[#4CADDA] mt-1 ${
            comment.userEmail !== email && "invisible"
          } flex flex-row items-center justify-center`}
          disabled={
            deleteCommentLoader &&
            deleteCommentLoader.length > 0 &&
            (deleteCommentLoader as string[]).includes(String(comment._id))
          }
        />
      </div>
    </div>
  );
};

export default Comment;
