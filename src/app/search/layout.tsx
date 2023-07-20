import Sidebar from "@/components/Home/Sidebar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full">
      <Sidebar />
      {children}
    </main>
  );
}
