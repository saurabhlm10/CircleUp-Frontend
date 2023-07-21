import { AxiosError } from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
import { Adapter } from "next-auth/adapters";
import axiosInstanceBackend from "@/axios";
import { GoogleProfile } from "next-auth/providers/google";
import { usernameConstructor } from "@/lib/utils";
import JWT from "jsonwebtoken";
import toast from "react-hot-toast";

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
};

const adapter = MongoDBAdapter(clientPromise) as Adapter | undefined;

const handler = NextAuth({
  adapter,
  session: {
    strategy: "jwt",
  },
  // debug: true,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "string",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const res = await axiosInstanceBackend.post(
            "/auth/login",
            credentials
          );

          if (res.status === 200) {
            // Any object returned will be saved in `user` property of the JWT
            return res.data.user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          if (error instanceof AxiosError)
            throw new Error(error?.response?.data.message);
        }
      },
    }),
    GoogleProvider({
      async profile(profile: GoogleProfile) {
        const username = await usernameConstructor(profile.name.toLowerCase());

        const date = new Date(Date.now()).toISOString();

        return {
          username,
          email: profile.email,
          id: profile.name,
          followers: [],
          following: [],
          createdAt: date,
        };
      },
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, user };
      }
      return { ...token, user };
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    // async redirect() {
    //   return "/";
    // },
  },
});

export { handler as GET, handler as POST };
