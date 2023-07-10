"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/RegisterForm.css";
import BG from "@/assets/BG.png";
import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import registerSchema from "@/models/registerSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import axiosInstanceBackend from "@/axios";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onCreateAccount = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await axiosInstanceBackend.post("/auth/register", data);

      await signIn<"credentials">("credentials", {
        username: data.username,
        password: data.password,
      }).then((res) => {
        if (res?.ok) {
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          toast.success("Correct2");
        } else {
          return toast.error(res?.error as string);
        }
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  return (
    <>
      <form
        className={`h-screen flex flex-row justify-center items-center bg-cover bg-center`}
        style={{ backgroundImage: `url(${BG.src})` }}
        onSubmit={handleSubmit(onCreateAccount)}
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
                handleSubmit(onCreateAccount)(); // Manually invoke the form submission
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
                disabled={isLoading}
                onChange={(e) => {
                  setUsername(e.target.value.trim());
                }}
              />
              <label
                htmlFor="usernameFormControlInput"
                className={`text-[#4CADDA] pointer-events-none  absolute top-2 left-3 p-1 leading-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-[#4CADDA] ${
                  username &&
                  "-translate-y-[0.9rem] scale-[0.8]  text-[#4CADDA]"
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

            {/* Email Input Field  */}
            <div className="relative mt-2" data-te-input-wrapper-init>
              <input
                {...register("email")}
                className="h-[40px] w-[450px] p-2  peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 placeholder:border-2"
                id="emailFormControlInput"
                type="email"
                placeholder="Email"
                value={email}
                disabled={isLoading}
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                }}
              />
              <label
                htmlFor="emailFormControlInput"
                className={`text-[#4CADDA] pointer-events-none absolute top-2 left-3 p-1 leading-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none   ${
                  email && "-translate-y-[0.9rem] scale-[0.8] text-[#4CADDA] "
                } `}
              >
                Email
              </label>

              <div
                className={`text-red-300 text-xs
                ${errors.email ? "block" : "invisible"}`}
              >
                <div>{errors.email ? errors.email.message : "default"}</div>
              </div>
            </div>

            {/* Password Input Field  */}
            <div className="relative mt-2" data-te-input-wrapper-init>
              <input
                {...register("password")}
                className=" h-[40px] w-[450px] p-2  peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="passwordFormControlInput"
                type="password"
                placeholder="Password"
                value={password}
                disabled={isLoading}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label
                htmlFor="passwordFormControlInput"
                className={` text-[#4CADDA] pointer-events-none absolute top-2 left-3 p-1 leading-3	  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none  peer-focus:text-[#4CADDA] ${
                  password &&
                  "-translate-y-[0.9rem] scale-[0.8] text-[#4CADDA]"
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

              {/* Confirm Password Input Field  */}
              <div className="relative mt-2" data-te-input-wrapper-init>
                <input
                  {...register("confirmPassword")}
                  className=" h-[40px] w-[450px] p-2  peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="confirmPasswordFormControlInput"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  disabled={isLoading}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <label
                  htmlFor="confirmPasswordFormControlInput"
                  className={` text-[#4CADDA] pointer-events-none absolute top-2 left-3 p-1 leading-3	  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none  peer-focus:text-[#4CADDA] ${
                    confirmPassword &&
                    "-translate-y-[0.9rem] scale-[0.8] text-[#4CADDA]"
                  }`}
                >
                  Confirm Password
                </label>
                <div
                  className={`text-red-300 text-xs
              ${errors.confirmPassword ? "block" : "invisible"}`}
                >
                  <div>
                    {errors.confirmPassword
                      ? errors.confirmPassword.message
                      : "default"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Create Account Button */}
          <Button
            // type="submit"
            isLoading={isLoading}
            showCheckmark={showCheckmark}
            text="Create Account"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:4000/api/auth/register"
              );
              console.log(response);
            }}
            // onClick={onCreateAccount}
          />

          {/* Login Link  */}
          <p
            className={`font-display ${
              isLoading && "pointer-events-none"
            } text-center mt-4`}
          >
            Already have an account? &nbsp;
            <Link
              href={isLoading || showCheckmark ? "#" : "/auth/login"}
              className="text-cyan-700"
            >
              Login here.
            </Link>
          </p>
        </div>
      </form>
      <button
        onClick={async () => {
          // const response = await axiosInstance.post("/auth/register");
          // const response = await axios.post(
          //   "http://www.google.com/api/auth/register",
          //   {
          //     username: "test11",
          //     email: "test11@gmail.com",
          //     password: "12345678",
          //     confirmPassword: "12345678",
          //   }
          // );
          // console.log(response);
        }}
      >
        Hello
      </button>
      <button
        onClick={async () => {
          const response = await axiosInstanceBackend.post("/auth/register", {
            username: "test11",
            email: "test11@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
          });
          // const response = await axios.post(
          //   "http://localhost:4000/api/auth/register",
          // {
          //   username: "test11",
          //   email: "test11@gmail.com",
          //   password: "12345678",
          //   confirmPassword: "12345678",
          // }
          // );
          console.log(response);
        }}
      >
        Hello
      </button>
    </>
  );
};

export default RegisterForm;
