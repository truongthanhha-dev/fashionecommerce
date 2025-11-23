"use client";

import useCart from "@/lib/hooks/useCart";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";// hiển thị hình ảnh thay thế
import Image from "next/image";// quản lý ảnh và điều hướng trang.
import Link from "next/link";// quản lý ảnh và điều hướng trang.
import { usePathname, useRouter } from "next/navigation";//lấy đường dẫn hiện tại và điều hướng trang.
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  //quản lý trạng thái của menu thả xuống
  const [dropdownMenu, setDropdownMenu] = useState(false);
  //query: lưu trữ từ khóa tìm kiếm.
  const [query, setQuery] = useState("");

  return (
    // Logo
    <div className="front-navbar sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      {/* Menu điều hướng(Home, Wishlist, Orders) */}
      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`transition-colors ${
            pathname === "/"
              ? "text-[#fdd9b8]"
              : "text-[#ffece1]/70 hover:text-[#fdd9b8]"
          }`}
        >
          Trang chủ
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`transition-colors ${
            pathname === "/wishlist"
              ? "text-[#fdd9b8]"
              : "text-[#ffece1]/70 hover:text-[#fdd9b8]"
          }`}
        >
          Yêu thích
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`transition-colors ${
            pathname === "/orders"
              ? "text-[#fdd9b8]"
              : "text-[#ffece1]/70 hover:text-[#fdd9b8]"
          }`}
        >
          Đơn hàng
        </Link>
      </div>

      {/* Search */}
      <div className="front-search-box flex gap-3 px-3 py-1 items-center rounded-xl">
        <input
          className="front-search-input outline-none max-sm:max-w-[120px] placeholder:text-[#f5c3b0]/70"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button>
      </div>

      {/* Giỏ hàng */}
      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 border border-white/35 rounded-xl px-3 py-1 hover:bg-white/15 hover:text-white max-md:hidden"
        >
          <ShoppingCart className="text-white" />
          <p className="text-base-bold text-white">Giỏ hàng ({cart.cartItems.length})</p>
        </Link>

        {/* Menu icon (Menu Thả Xuống):liên kết (Home, Wishlist, Orders, Cart).  */}
        <Menu
          className="cursor-pointer lg:hidden text-white"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="front-dropdown absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg text-base-bold lg:hidden">
            <Link href="/" className="hover:text-[#b8654a]">
              Trang chủ
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-[#b8654a]"
            >
              Yêu thích
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-[#b8654a]"
            >
              Đơn hàng
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border border-white/35 rounded-lg px-2 py-1 hover:bg-white/15 hover:text-white"
            >
              <ShoppingCart className="text-white" />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {/* User button:nút hiện ảnh tải khoản người dùng */}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in" className="text-white">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
