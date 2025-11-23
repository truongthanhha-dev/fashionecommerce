"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="luxe-shell luxe-shell--sidebar h-[calc(100vh-3rem)] sticky top-6 left-0 p-10 flex flex-col gap-16 max-lg:hidden overflow-hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex w-full items-center gap-4 px-4 py-3 text-body-medium transition-all duration-300 border-l-4 ${
              pathname === link.url
                ? "bg-white text-[#8b4f32] border-[#c78b63] shadow-md"
                : "text-grey-1 border-transparent hover:bg-white/50 hover:text-[#8b4f32]"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center text-[#754f30]">
        <UserButton />
        <p className="luxe-highlight tracking-[0.15em]">Chỉnh sửa hồ sơ</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
