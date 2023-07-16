"use client";

import { CentralizingDiv } from "@/components/CentralizingDiv";
import Sidebar from "@/components/Home/Sidebar";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

interface pageProps {
  params: {
    username: string;
  };
}

const page: FC<pageProps> = ({ params }: { params: { username: string } }) => {
  const [selfUser, setSelfUser] = useState<boolean>(false);

  const checkSelf = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (params.username === user.username) return setSelfUser(true);
  };

  useEffect(() => {
    checkSelf();
  }, []);

  return (
    <div className="border-2 border-black flex-1 grid grid-cols-12">
      <div className=" col-span-10 font-display flex flex-col items-center text-center">
        <ProfileDetails/>

        {/* POSTS---------------------------- */}
        <div className="h-[2px] w-96 bg-black mt-6"></div>

        {/* <div className="mt-4">
        {posts.length ? (
          <div className="grid grid-cols-3	gap-[10px]">
            {posts.map((post, id) => (
              <Link to={`/u/${post._id}`} key={id}>
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
              photo_camera
            </span>
            <br />
            <div className="">No Posts</div>
          </div>
        )}
      </div> */}
      </div>
      <CentralizingDiv />
    </div>
  );
};

export default page;
