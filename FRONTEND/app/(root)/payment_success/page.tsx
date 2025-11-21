"use client";
import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center gap-6 p-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      {/* Nền với hình ảnh và hiệu ứng blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-60 backdrop-blur-3xl"
        style={{ backgroundImage: 'url("/payment.png")' }}
      ></div>
      
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-10 shadow-xl max-w-lg">
        {/* Dấu tick với nền tròn */}
        <div className="mb-6 flex justify-center items-center bg-yellow-400 rounded-full w-20 h-20 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Tiêu đề */}
        <p className="text-heading3-bold font-bold text-yellow-400">Thanh toán thành công!</p>
        
        {/* Mô tả */}
        <p className="text-lg mt-4 text-gray-300">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Chúng tôi sẽ chuẩn bị đơn hàng của bạn ngay lập tức.
        </p>
        
        {/* Nút tiếp tục mua sắm */}
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition duration-200 ease-in-out"
        >
          TIẾP TỤC MUA SẮM
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
