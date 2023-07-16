"use client";

import { useState, useRef, useEffect, FC, ChangeEvent } from "react";
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

import { CentralizingDiv } from "@/components/CentralizingDiv";
import Button3 from "@/components/ui/Button3";
import axiosInstanceBackend from "@/axios";
import useUser from "@/helpers/useUser";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface CreatePostProps {}

const page: FC<CreatePostProps> = () => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);

  const [loadedFileUrl, setLoadedFileUrl] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [invalidInput, setInvalidInput] = useState(false);

  //   const fileRef = useRef<HTMLInputElement | null>();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const loadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setCurrentImage(e.target.files![0]);
      setLoadedFileUrl(URL.createObjectURL(e.target.files![0]));
    }
  };

  const deleteImage = () => {
    setCurrentImage(null);
    setLoadedFileUrl(null);
  };

  const addPost = async () => {
    setIsLoading(true);


    if (!currentImage || !loadedFileUrl) {
      setInvalidInput(true);
      setIsLoading(false);

      return;
    }
    try {
      const user = await useUser(session?.data?.user?.email!);

      const formData: FormData = new FormData();
      formData.append("image", currentImage!);
      formData.append("userId", user._id);
      formData.append("username", user.username);

      const config: AxiosRequestConfig<FormData> = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstanceBackend.post(
        "/post/createpost",
        formData,
        config
      );

      console.log(response);

      toast.success("Post Created Successfully");

      setTimeout(() => {
        // navigate(`/u/${response.data.id}`);
      }, 1000);

      return deleteImage();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setInvalidInput(false);
  }, [currentImage]);

  if (!session) return <h1>Loading</h1>;

  return (
    <>
      <div className="flex-1 grid grid-cols-12 border-2 border-red-600">
        <div className="col-span-10 border-2 border-yellow-400">
          <div className="flex flex-row justify-center ">
            <div className="flex flex-col pt-4 items-center">
              <p
                className={`text-red-300 text-sm mb-1 ${
                  invalidInput ? "block" : "invisible"
                }`}
              >
                Please add a file
              </p>
              {loadedFileUrl ? (
                <div className="relative flex justify-center items-center w-[450px] h-[450px] shadow group">
                  <img
                    src={loadedFileUrl}
                    className="object-contain w-full h-full"
                  />
                  <div
                    className={` absolute top-2 right-2 flex opacity-0 cursor-pointer border-2 hover:border-[#4CADDA] border-white bg-[#58c1de] h-8 w-8 group-hover:opacity-100 flex-row justify-center items-center rounded-full transition-all duration-150 ease-in hover:bg-[#4CADDA] ${
                      // (isLoading || showCheckmark) && "hidden"
                      (false || false) && "hidden"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-white"
                      onClick={deleteImage}
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
                </div>
              ) : (
                <div className="group">
                  <input
                    type="file"
                    ref={fileRef}
                    id="imageInput"
                    name="filename"
                    accept="images/*"
                    onChange={(e) => loadFile(e)}
                    className="hidden"
                  />
                  <div className="font-display flex flex-row justify-center items-center text-[#58c1de] group-hover:text-[#4CADDA]">
                    <label
                      htmlFor="imageInput"
                      className="border-4 border-[#58c1de] group-hover:border-[#4CADDA] transition-all duration- 50 ease-in w-[450px] h-[450px] rounded-[12px] cursor-pointer text-lg flex flex-col items-center justify-center"
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
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>

                      <div className="transition-all duration-50 ease-in">
                        Upload Image
                      </div>
                    </label>
                  </div>
                </div>
              )}
              <Button3
                text="Add Post"
                onClick={addPost}
                isLoading={isLoading}
                showCheckmark={showCheckmark}
              />
            </div>
          </div>
        </div>
        <CentralizingDiv />
      </div>
    </>
  );
};

export default page;
