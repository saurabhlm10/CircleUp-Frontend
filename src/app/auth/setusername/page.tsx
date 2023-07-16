"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BG from "@/assets/BG.png";
import "@/styles/RegisterForm.css";
import Button from "@/components/ui/Button";
import useUser from "@/helpers/useUser";
import { useSession } from "next-auth/react";
import axiosInstanceBackend from "@/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface pageProps {}

interface Username {
  username: string;
}

const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username Should Be At Least 3 Characters" })
    .max(20, { message: "Username Should Be At Most 20 Characters" }),
});

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const session = useSession();

  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Username>({
    resolver: zodResolver(usernameSchema),
  });

  const onChangeUsername = async (data: Username) => {
    setIsLoading(true);

    try {
      console.log(data);
      const response = await axiosInstanceBackend.post("/profile/changeusername", {
        username: username.toLowerCase().trim(),
      });

      router.push("/");
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

  const getUser = async () => {
    const response = (await useUser(
      session?.data?.user?.email!
    )) as UserModelResponse;
    console.log(response);
    reset({
      username: response.username,
    });
    setUsername(response.username);
  };

  useEffect(() => {
    if (session.data?.user?.email) {
      getUser();
    }
  }, [session.data]);

  return (
    <form
      className={`h-screen flex flex-row justify-center items-center bg-cover bg-center`}
      style={{ backgroundImage: `url(${BG.src})` }}
      onSubmit={handleSubmit(onChangeUsername)}
    >
      {/* Form  */}
      <div
        className="flex flex-col gap-[2px] px-8 pt-8 pb-4 rounded-2xl shadow-xl backdrop-blur 
bg-gradient-to-br from-white via-blue-50 to-[#e9fffc]"
      >
        {/* Logo  */}
        <h1 className="font-bold font-head text-center text-4xl ">LOGO</h1>

        {/* Input Fields Container  */}
        <div
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent the default form submission behavior
              handleSubmit(onChangeUsername)(); // Manually invoke the form submission
            }
          }}
        >
          {/* Username Input Field  */}
          <div className="mt-6 relative" data-te-input-wrapper-init>
            <input
              {...register("username")}
              className="h[40px] w-[450px]  p-2 peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transiztion-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
              type="text"
              id="usernameFormControlInput"
              placeholder="Username"
              value={username}
              // value=''
              disabled={isLoading}
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
            />
            <label
              htmlFor="usernameFormControlInput"
              className={`text-[#4CADDA] pointer-events-none  absolute top-2 left-3 p-1 leading-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-[#4CADDA] ${
                username && "-translate-y-[0.9rem] scale-[0.8]  text-[#4CADDA]"
              }`}
            >
              Username
            </label>
            <div
              className={`text-red-300 text-xs
        ${errors.username ? "block" : "invisible"}
        `}
            >
              <div>{errors.username ? errors.username.message : "default"}</div>
            </div>
          </div>

          {/* Change Username Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            showCheckmark={showCheckmark}
            text="Set Username"
          />
        </div>
      </div>
    </form>
  );
};

export default page;
