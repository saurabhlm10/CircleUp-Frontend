"use client";

import Sidebar from "@/components/Home/Sidebar";
import getUser from "@/helpers/getUser";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { getServerSession } from "next-auth/next";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (session.data?.user?.email) {
      getThisUser();
    }
  }, [session.data]);

  return (
    <div className="flex-1 grid grid-cols-12 h-screen border-2 border-red-600">
      <div className="col-span-11">Hello</div>
      <div className="col-span-1 border-2 border-black flex flex-col items-center pt-4">
        <Link
          href={`/profile/${user?.username}`}
          className=" relative  inline-flex rounded-full group overflow-hidden bg-[#4CADDA] text-purple-600"
        >
          <span className=" absolute inline-flex top-0 left-0  w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90 border-black"></span>
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
  );
}
