// components/ContactLinks.jsx
"use client";
import React, { useState } from "react";

const ContactLinks = () => {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái ẩn/hiện các nút liên hệ

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3">
      {/* Icon chính */}
      <button
    onClick={() => setIsOpen(!isOpen)}
    className="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow hover:scale-110 transition-transform relative"
  >
    <img
      src="/1.png" // Icon ngôi sao (đặt trong thư mục /public)
      alt="Toggle Contacts"
      className="w-18 h-18 animate-phone-ring"  // Điều chỉnh kích thước icon cho phù hợp
    />
  </button>

      {/* Các nút liên hệ */}
      {isOpen && (
        <div className="flex flex-col gap-3">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/biluxury.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow hover:scale-110 transition-transform"
          >
            <img src="/2.png" alt="Facebook" className="w-6 h-6" />
          </a>

          {/* Insta */}
          <a
            href="https://www.instagram.com/biluxury.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow hover:scale-110 transition-transform"
          >
            <img src="/3.png" alt="Messenger" className="w-6 h-6" />
          </a>

          {/* Zalo */}
          <a
            href="https://zalo.me/YOUR_ZALO_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full shadow hover:scale-110 transition-transform"
          >
            <img src="/4.png" alt="Zalo" className="w-6 h-6" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactLinks;
