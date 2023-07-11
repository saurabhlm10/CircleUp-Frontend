import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import axiosInstanceBackend from "@/axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function usernameConstructor(username: string): Promise<string> {
  try {
    const constructedUsername = await axiosInstanceBackend.post(
      "/auth/createusername",
      { Googlename: username }
    );

    return constructedUsername.data.username;
  } catch (error) {
    console.log("hello error");
    console.log(error);
    return (
      username.replace(" ", "") +
      String(Math.random() * 100000)
        .slice(0, 6)
        .replace(".", "")
    );
  }
}