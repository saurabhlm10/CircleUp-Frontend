import React, {
  Dispatch,
  FC,
  LegacyRef,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColorRing } from "react-loader-spinner";

import "./deletemodal.css";
import fetchUser from "@/helpers/fetchUser";
import { useSession } from "next-auth/react";
import axiosInstanceBackend from "@/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface pageProps {
  postId: string;
  deleteModalOpen: boolean;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal: FC<pageProps> = ({
  postId,
  deleteModalOpen,
  setDeleteModalOpen,
}) => {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);

  const modalRef: RefObject<HTMLDivElement> | undefined = useRef(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const pRef = useRef<HTMLParagraphElement | null>(null);

  const onDeletePost = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstanceBackend.delete(
        `/post/deletepost/${postId}`
      );

      const rawUser = await fetchUser(session.data?.user?.email!);
      const username = (JSON.parse(rawUser) as UserModelResponse).username;

      setIsLoading(false);
      setShowCheckmark(true);
      setTimeout(() => {
        setShowCheckmark(false);
        router.push(`/profile/${username}`);
        setDeleteModalOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setDeleteModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (!modalRef?.current!) {
      return;
    } else if (cancelButtonRef.current?.isEqualNode(e.target as Node | null)) {
      return;
    } else if (
      confirmButtonRef.current?.contains(e.target as Node | null) ||
      confirmButtonRef.current?.isEqualNode(e.target as Node | null) ||
      pRef.current?.isEqualNode(e.target as Node | null)
    ) {
      return;
    } else if (
      modalRef.current?.isEqualNode(e.target as Node | null) ||
      headingRef.current?.isEqualNode(e.target as Node | null)
    ) {
      return;
    } else {
      setDeleteModalOpen(false);
    }
  }

  if (!session.data) return <h1>Loading</h1>;

  return (
    <div className="modal-container font-display font-semibold ">
      <div
        className="border-2 border-[#4CADDA] shadow-[#4CADDA] h-48 w-80 rounded-md flex flex-col items-center justify-between py-4 bg-white"
        ref={modalRef}
      >
        <h3 ref={headingRef}>Are You Sure?</h3>
        <div className="flex flex-row justify-between gap-[20px]">
          <button
            className="h-12 w-28 text-black border-2 border-[#4CADDA] bg-white  rounded-full py-2 px-4 text-2xl flex flex-row justify-center items-center"
            onClick={() => {
              setDeleteModalOpen(false);
            }}
            disabled={isLoading || showCheckmark}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <button
            className={` h-12 w-28 text-white border-2 border-[#4CADDA] bg-[#4CADDA]  hover:text-black rounded-full text-2xl flex flex-row justify-center items-center ${
              isLoading || showCheckmark
                ? "hover:bg-[#4CADDA]"
                : "hover:bg-white"
            }`}
            disabled={isLoading || showCheckmark}
            ref={confirmButtonRef}
            onClick={onDeletePost}
          >
            <span className=" relative text-black group-hover:text-white font-display font-semibold">
              {isLoading || showCheckmark ? (
                <div>
                  {isLoading && (
                    <span className="relative w-full">
                      <span className="transition-all duration-1000">
                        <ColorRing
                          visible={true}
                          height={`${isLoading ? "35" : "0"}`}
                          width={`${isLoading ? "35" : "0"}`}
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                          ]}
                        />
                      </span>
                    </span>
                  )}
                  {showCheckmark && (
                    <span className="h-[30px] w-[30px] text-black flex justify-center items-center">
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="8 9 35 35"
                      >
                        <path
                          className="checkmark__check"
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              ) : (
                <p className="" ref={pRef}>
                  Confirm
                </p>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
