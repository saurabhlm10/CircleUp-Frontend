"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </SessionProvider>
  );
};

export default Providers;
