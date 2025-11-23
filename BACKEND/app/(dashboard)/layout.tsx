import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rubies - Trang quản lý",
  description: "Trang quản lý để quản lý dữ liệu của Rubies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} luxe-body`}>
          <ToasterProvider />
          <div className="flex gap-6 max-lg:flex-col text-grey-1 min-h-screen p-6">
            <LeftSideBar />
            <div className="flex-1 flex flex-col gap-6">
              <TopBar />
              <div className="luxe-shell luxe-content flex-1">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
