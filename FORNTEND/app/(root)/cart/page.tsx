"use client";

import useCart from "@/lib/hooks/useCart"; // quản lý trạng thái của giỏ hàng.
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react"; // điều khiển số lượng sản phẩm.
import Image from "next/image";
import { useRouter } from "next/navigation"; // thanh điều hướng

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  // tính tổng số tiền của giỏ hàng = (giá từng sản phẩm * số lượng của nó) rồi cộng dồn.
  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  // làm tròn tổng tiền đến 2 chữ số thập phân.
  const totalRounded = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(Math.round(total));

  // customer: thông tin người dùng (clerkId, email, name) để truyền vào khi thực hiện thanh toán.
  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      // người dùng đã đăng nhập chưa? -> nếu chưa -> đến trang đăng nhập.
      if (!user) {
        router.push("sign-in");
      } else {
        // Nếu đã đăng nhập, chuyển hướng đến URL thanh toán từ API.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer }),
        });
        const data = await res.json();
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  // Giao diện của giỏ hàng:
  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Giỏ hàng</p>
        <hr className="my-6" />

        {/* Nếu giỏ hàng trống, hiển thị thông báo “No item in cart.” */}
        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">Không có sản phẩm nào trong giỏ hàng</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center w-full">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-7 w-full">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    {/* Định dạng giá sản phẩm thành tiền Việt Nam Đồng */}
                    <p className="text-small-medium">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(cartItem.item.price)}
                    </p>
                  </div>
                </div>

                {/* Nút tăng giảm số lượng sản phẩm */}
                <div className="flex gap-4 items-center justify-center ml-4">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => {
                      // Giảm số lượng, nhưng không cho số lượng giảm dưới 1
                      if (cartItem.quantity > 1) {
                        cart.decreaseQuantity(cartItem.item._id);
                      }
                    }}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                {/* Nút Trash: xóa sản phẩm khỏi giỏ hàng */}
                <Trash
                  className="hover:text-red-1 cursor-pointer ml-10"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phần thanh toán (Summary): Hiển thị tổng số tiền của tất cả sản phẩm và số lượng sản phẩm trong giỏ hàng. */}
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Đơn hàng của bạn{" "}
          <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "sản phẩm" : "sản phẩm"})`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Tổng số tiền</span>
          <span>{totalRounded}</span>
        </div>

        {/* Nút "Proceed to Checkout" cho phép người dùng chuyển đến trang thanh toán. */}
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
