"use client";

import axiosInstanceBackend from "@/axios";
import { CentralizingDiv } from "@/components/CentralizingDiv";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import { AxiosError } from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

interface ProfileProps {
  params: {
    username: string;
  };
}

const Profile: FC<ProfileProps> = ({ params }) => {
  const session = useSession();
  const [user, setUser] = useState<UserModelResponse | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const [selfProfile, setSelfProfile] = useState(false);

  const [posts, setPosts] = useState<PostModelType[]>([]);

  const getUser = async (email: string) => {
    try {
      const response = await axiosInstanceBackend.get(
        `/profile/getProfileByEmail/${email}`
      );

      setUser(response.data.user);
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

  const getUserPosts = async (userEmail: string) => {
    try {
      const response = await axiosInstanceBackend.get(
        `/post/getuserposts/${userEmail}`
      );

      setPosts(response.data.posts);
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

  const checkSelf = async (email: string) => {
    if (session.data?.user?.email === email) {
      setSelfProfile(true);
    }
  };

  const getEmailByUsername = async (username: string) => {
    try {
      const response = await axiosInstanceBackend.get(
        `/profile/getEmailByUsername/${username}`
      );

      setUserEmail(response.data.email);
      checkSelf(response.data.email);
      getUser(response.data.email);
      getUserPosts(response.data.email);
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

  useEffect(() => {
    getEmailByUsername(params.username);
  }, [session.data, params.username]);

  if (!session) return <h1>Loading</h1>;

  return (
    <div className="flex-1 grid grid-cols-12 ">
      <div className="col-span-10 font-display flex flex-col items-center text-center">
        <ProfileDetails
          email={session.data?.user?.email!}
          userEmail={userEmail}
          user={user!}
          selfProfile={selfProfile}
          setUser={setUser}
        />

        {/* POSTS---------------------------- */}
        <div className="h-[2px] w-96 bg-black mt-6"></div>

        <div className="mt-4">
          {posts.length ? (
            <div className="grid grid-cols-3	gap-[10px]">
              {posts.map((post, id) => (
                <Link href={`/post/${post._id}`} key={id}>
                  <div className="w-[200px] h-[200px] overflow-hidden	flex flex-row justify-center items-center">
                    <img
                      src={`${post.imageUrl}`}
                      alt="post"
                      className=" h-full object-cover	"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-[300px] w-[500px] flex flex-col justify-center items-center text-3xl">
              <span className="material-symbols-outlined flex flex-row justify-center items-center text-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
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
              </span>
              <br />
              <div className="">No Posts</div>
            </div>
          )}
        </div>
      </div>
      <CentralizingDiv />
    </div>
  );
};

export default Profile;
