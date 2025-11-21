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
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white shadow-lg max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      {/* Menu điều hướng(Home, Wishlist, Orders) */}
      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link href="/" className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`} >Trang chủ</Link>
        <Link href={user ? "/wishlist" : "/sign-in"} className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"}`}>Yêu thích</Link>
        <Link href={user ? "/orders" : "/sign-in"} className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`} >Đơn hàng</Link>
      </div>

      {/* Search */}
      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
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
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Giỏ hàng ({cart.cartItems.length})</p>
        </Link>

        {/* Menu icon (Menu Thả Xuống):liên kết (Home, Wishlist, Orders, Cart).  */}
        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href="/" className="hover:text-red-1">
              Trang chủ
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-red-1"
            >
              Yêu thích
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-red-1"
            >
              Đơn hàng
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {/* User button:nút hiện ảnh tải khoản người dùng */}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
