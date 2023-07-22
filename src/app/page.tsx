"use client";

import Posts from "@/components/Home/Posts";
import Sidebar from "@/components/Home/Sidebar";
import getUser from "@/helpers/getUser";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { getToken } from "next-auth/jwt";

// import { getServerSession } from "next-auth/next";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JWT, { JsonWebTokenError } from "jsonwebtoken";
import axiosInstanceBackend from "@/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import mixStringsComplex from "@/helpers/mixStrings";

export default function Home() {
  const session = useSession();

  const [user, setUser] = useState<UserModelResponse>({
    _id: "",
    username: "",
    email: "",
    followers: [""],
    following: [""],
  });

  const getThisUser = async () => {
    const response = (await getUser(
      session?.data?.user?.email!
    )) as UserModelResponse;
    setUser(response);
  };

  const setToken = async (email: string) => {
    try {
      // const jwttoken = JWT.sign(
      //   session.data?.user!,
      //   process.env.NEXT_PUBLIC_JWT_SECRET!
      // );

      // console.log(jwttoken);

      // const token = mixStringsComplex(
      //   email,
      //   process.env.NEXT_PUBLIC_JWT_SECRET!,
      //   "1"
      // );

      const response = await axiosInstanceBackend.get(
        "/auth/googlelogin",
        {
          headers: {
            token: email,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof JsonWebTokenError) {
        toast.error(error.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    console.log(session.data)
    if (session.data?.user?.email) {
      setToken(session.data?.user?.email);
      getThisUser();
    }
  }, [session.data]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 grid grid-cols-12 h-screen overflow-hidden">
        <div className="col-span-11">
          <div className="flex flex-row justify-center w-full ">
            <div className="pt-4 w-full flex flex-row justify-center">
              <Posts className="font-display flex flex-col gap-12 h-screen overflow-y-scroll no-scrollbar w-full items-center" />
            </div>
          </div>
          {/* <Posts />s */}
        </div>
        <div className="col-span-1 flex flex-col items-center pt-4">
          <Link
            href={`/profile/${user?.username}`}
            className=" relative  inline-flex rounded-full group overflow-hidden bg-[#4CADDA] text-purple-600"
          >
            <span className=" absolute inline-flex top-0 left-0  w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90 border-"></span>
            <span className="relative inline-flex group-hover:text-white">
              <span className="inline-flex material-symbols-outlined text-white  text-6xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-20 h-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
