// hiển thị thông tin về sản phẩm dưới dạng thẻ sản phẩm

"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[260px] flex flex-col gap-3"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={260}
        height={300}
        className="h-[371px] object-cover shadow-2xl"
      />
      {/* Chứa tiêu đề và danh mục của sản phẩm. */}
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2 mt-1">{product.category}</p>
      </div>

      {/* Chứa giá sản phẩm và biểu tượng yêu thích (nếu có) */}
      <div className="flex justify-between ">
        <p className="text-body-bold">{formatCurrency(product.price)}</p>
        <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  );
};

export default ProductCard;
