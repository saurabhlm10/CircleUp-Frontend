"use client";

import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";

import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  // console.log(session.data?.user);

  if (!session) return useRouter().push("/auth/login");

  return (
    <main>
      {JSON.stringify(session.data)}
      {/* {JSON.stringify(session.data)} */}
    </main>
  );
}
