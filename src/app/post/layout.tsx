import { CentralizingDiv } from "@/components/CentralizingDiv";
import Sidebar from "@/components/Home/Sidebar";


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
