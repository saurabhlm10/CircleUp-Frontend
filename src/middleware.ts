import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import axiosInstanceBackend from "./axios";
import toast from "react-hot-toast";
import checkUsernameExists from "./helpers/checkUsernameExists";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/auth/login");
    const isRegisterPage = pathname.startsWith("/auth/register");

    const sensitiveRoutes = ["/", "/profile/:path*", "/createpost"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage || isRegisterPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/setusername",
    "/profile/:path*",
  ],
};
