// // trang chi tiết sản phẩm
"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  // Hàm định dạng tiền tệ Việt Nam
  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[500px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Loại sản phẩm:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      {/* Hiển thị giá sản phẩm với định dạng tiền Việt */}
      <p className="text-heading3-bold">{formatCurrency(productInfo.price)}</p>

      <p className="flex items-center justify-center max-w-[290px] px-2 py-1 bg-red-2 text-white font-medium rounded-md">
        Không áp dụng chính sách đổi trả
      </p>
  
      <div className="border-t-2 border-grey-3 my-1.5"></div>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Mô tả sản phẩm:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Màu sắc:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-grey-3 px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-red-2 text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Kích cỡ:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-grey-2 px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-red-2 text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-base-medium">Sizing Help</h4>
        <table className="w-full text-center border border-grey-3 mt-2">
          <thead>
            <tr>
              <th className="border border-grey-3 px-2 py-1">Size</th>
              <th className="border border-grey-3 px-2 py-1">V1</th>
              <th className="border border-grey-3 px-2 py-1">V2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-grey-3 px-2 py-1">Size S</td>
              <td className="border border-grey-3 px-2 py-1">V1: Dưới 82</td>
              <td className="border border-grey-3 px-2 py-1">V2: Dưới 64</td>
            </tr>
            <tr>
              <td className="border border-grey-3 px-2 py-1">Size M</td>
              <td className="border border-grey-3 px-2 py-1">V1: 82 - 86</td>
              <td className="border border-grey-3 px-2 py-1">V2: 64 - 68</td>
            </tr>
            <tr>
              <td className="border border-grey-3 px-2 py-1">Size L</td>
              <td className="border border-grey-3 px-2 py-1">V1: 86 - 90</td>
              <td className="border border-grey-3 px-2 py-1">V2: 68 - 74</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Số lượng:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-red-2 hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        THÊM VÀO GIỎ HÀNG
      </button>
    </div>
  );
};

export default ProductInfo;
