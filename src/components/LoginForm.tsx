"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/RegisterForm.css";
import BG from "@/assets/BG.png";
import Button from "./ui/Button";
import VarButton from "./ui/varButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import loginSchema from "@/models/loginSchema";
import { signIn } from "next-auth/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import axiosInstanceBackend from "@/axios";
// import { useRouter } from "next/router";

type LoginFormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("12345678");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    data.username = data.username.toLowerCase();
    try {
      const response = await axiosInstanceBackend.post("/auth/login", data);

      localStorage.setItem('usernameSet', 'yes')


      await signIn<"credentials">("credentials", {
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
      // router.push('/')
    } catch (error) {
      if (error instanceof Error) {
        // display the error
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
      setIsLoading(false);
    };
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BG.src})` }}
    >
      <form className={`w-1/3 border-black`} onSubmit={handleSubmit(onLogin)}>
        {/* Form  */}
        <div
          className="flex flex-col gap-[2px] px-8 pt-8 pb-4 rounded-2xl shadow-xl backdrop-blur 
      bg-gradient-to-br from-white via-blue-50 to-[#e9fffc] "
        >
          {/* Logo  */}
          <h1 className="font-bold font-head text-center text-4xl ">LOGO</h1>

          {/* Input Fields Container  */}
          <div
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent the default form submission behavior
                handleSubmit(onLogin)(); // Manually invoke the form submission
              }
            }}
          >
            {/* Username Input Field  */}
            <div className="mt-6 relative" data-te-input-wrapper-init>
              <input
                {...register("username")}
                className="h[40px] w-full  p-2 peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transiztion-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
                type="text"
                id="usernameFormControlInput"
                placeholder="Username"
                value={username}
                disabled={isLoading}
                onChange={(e) => {
                  setUsername(e.target.value.trim());
                }}
              />
              <label
                htmlFor="usernameFormControlInput"
                className={`text-[#4CADDA] pointer-events-none  absolute top-2 left-3 p-1 leading-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-[#4CADDA] ${
                  username && "-translate-y-[0.9rem] scale-[0.8] text-[#4CADDA]"
                }`}
              >
                Username
              </label>
              <div
                className={`text-red-300 text-xs
              ${errors.username ? "block" : "invisible"}
              `}
              >
                <div>
                  {errors.username ? errors.username.message : "default"}
                </div>
              </div>
            </div>

            {/* Password Input Field  */}
            <div className="relative mt-2" data-te-input-wrapper-init>
              <input
                {...register("password")}
                className=" h-[40px] w-full p-2  peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                value={password}
                id="passwordFormControlInput"
                type="password"
                placeholder="Password"
                disabled={isLoading}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label
                htmlFor="passwordFormControlInput"
                className={` text-[#4CADDA] pointer-events-none absolute top-2 left-3 p-1 leading-3	  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none  peer-focus:text-[#4CADDA] ${
                  password &&
                  "-translate-y-[0.9rem] scale-[0.8]  text-[#4CADDA]"
                }`}
              >
                Password
              </label>
              <div
                className={`text-red-300 text-xs
              ${errors.password ? "block" : "invisible"}`}
              >
                <div>
                  {errors.password ? errors.password.message : "default"}
                </div>
              </div>
            </div>
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            showCheckmark={showCheckmark}
            text="Sign In"
            // onClick={onCreateAccount}
          />
        </div>
      </form>

      <VarButton
        isLoading={isLoading}
        type="button"
        className=" w-1/3 mt-10 h-12 text-base"
        onClick={loginWithGoogle}
      >
        {isLoading ? null : (
          <svg
            className="mr-2 h-6 w-6"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        )}
        Continue With Google
      </VarButton>

      {/* Register Link  */}
      <p
        className={`font-display w-1/3 ${
          isLoading && "pointer-events-none"
        } text-center mt-4`}
      >
        Don't have an account? &nbsp;
        <Link
          href={isLoading || showCheckmark ? "#" : "/auth/register"}
          className="text-cyan-700"
        >
          Register here.
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
