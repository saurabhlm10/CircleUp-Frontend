import { CentralizingDiv } from "@/components/CentralizingDiv";
import Post from "@/components/Home/Post";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div className="flex-1 grid grid-cols-12 ">
      <Post postId={params.id}/>
      <CentralizingDiv/>
    </div>
  );
};

export default page;
