"use client";

import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import Button2 from "../ui/Button2";
import axiosInstanceBackend from "@/axios";
import axios from "axios";

axios.defaults.withCredentials = true;

const Sidebar = () => {
  return (
    <div className="w-[15vw] font-display bg-gradient-to-br from-[#4CADDA] to-[#afe3f2] pt-12 pl-6 h-screen">
      <Link href="/" className="">
        <h1 className="mt-4 text-xl font-head font-bold text-white">LOGO</h1>
      </Link>
      <Link
        href="/createpost"
        className="mt-12 relative inline-block text-lg group"
      >
        <Button text="CREATE POST" />
      </Link>
      <div className="flex flex-col mt-8 gap-2">
        <Link href="/search">
          <Button2 text="Search"/>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
