// hiển thị hình ảnh hoặc video của sản phẩm.

"use client"

import Image from "next/image";
import React, { useState } from "react";

// State để Quản lý Hình Ảnh Chính
const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    // Hình Ảnh Chính:
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        width={400}
        height={400}
        alt="product"
        className=" rounded-lg shadow-2xl object-cover"
      />
      {/* Hình Ảnh Tham Khảo: */}
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={200}
            width={200}
            alt="product"
        // nhấp vào một hình ảnh nhỏ, làm cho hình ảnh đó trở thành hình ảnh chính.
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === image ? "border-2 border-black" : ""}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
