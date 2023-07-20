import { useState, useEffect, FC } from "react";
import Post from "./Post";
import fetchUser from "@/helpers/fetchUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axiosInstanceBackend from "@/axios";

interface PostsProps {
  className: string;
}

const Posts: FC<PostsProps> = ({ className, ...props }) => {
  const session = useSession();

  const [posts, setPosts] = useState<PostModelType[]>([]);

  const getPosts = async () => {
    try {
      const rawUser = await fetchUser(session.data?.user?.email!);

      const user = JSON.parse(rawUser);

      if (user.following.length !== 0) {
        const response = await axiosInstanceBackend.get(
          `/post/getposts/${user.following}`
        );

        setPosts([...response.data.posts]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session.data?.user?.email) {
      getPosts();
    }
  }, [session.data]);

  if (!session.data) return <h1>Loading</h1>;

  return (
    <div className={className} {...props}>
      {posts.length ? (
        posts.map((post, id) => (
          <div key={id} className="w-[450px]">
            <div className="border-r-2 border-l-2 pb-20 border-gray-100">
              <Post sentPost={post} key={id} />
            </div>
          </div>
        ))
      ) : (
        <div>Follow some people to see their posts</div>
      )}
    </div>
  );
};

export default Posts;
