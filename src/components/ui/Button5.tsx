import { ButtonHTMLAttributes, FC } from "react";
import { ColorRing } from "react-loader-spinner";

interface Button5Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  deleteCommentLoader: string[];
  comment: CommentModel;
}

const Button5: FC<Button5Props> = ({
  deleteCommentLoader,
  comment,
  ...props
}) => {
  return (
    <button {...props}>
      {deleteCommentLoader &&
      deleteCommentLoader.length > 0 &&
      (deleteCommentLoader as string[]).includes(String(comment._id)) ? (
        <ColorRing
          visible={true}
          height="15"
          width="15"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#4CADDA", "#4CADDA", "#4CADDA", "#4CADDA", "#4CADDA"]}
        />
      ) : (
        "Delete"
      )}
    </button>
  );
};

export default Button5;
