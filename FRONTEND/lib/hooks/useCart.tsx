// // quản lý giỏ hàng trong ứng dụng, cho phép thêm, xóa, tăng giảm số lượng và xóa tất cả các mặt hàng trong giỏ.
// import { create } from "zustand";
// import { toast } from "react-hot-toast";
// // dữ liệu không bị mất khi người dùng làm mới trang
// import { persist, createJSONStorage } from "zustand/middleware";

// // Giao diện định nghĩa cấu trúc của một mục hàng trong giỏ
// interface CartItem {
//   // Thông tin sản phẩm.
//   item: ProductType;
//   // Số lượng sản phẩm.
//   quantity: number;
//   color?: string; // ? nghĩa là tuỳ chọn
//   size?: string;
// }

// // Giao diện cho trạng thái giỏ hàng
// interface CartStore {
//   // Danh sách các sản phẩm trong giỏ.
//   cartItems: CartItem[];
//   // Các hàm để quản lý và cập nhật giỏ hàng.
//   addItem: (item: CartItem) => void;
//   removeItem: (idToRemove: string) => void;
//   increaseQuantity: (idToIncrease: string) => void;
//   decreaseQuantity: (idToDecrease: string) => void;
//   clearCart: () => void;
// }

// const useCart = create(
//   persist<CartStore>(
//     (set, get) => ({
//       cartItems: [],
//       // Thêm sản phẩm vào giỏ.
//       addItem: (data: CartItem) => {
//         const { item, quantity, color, size } = data;
//         const currentItems = get().cartItems;
//         const isExisting = currentItems.find(
//           (cartItem) => cartItem.item._id === item._id
//         );
//         // Nếu sản phẩm đã tồn tại trong giỏ
//         if (isExisting) {
//           return toast("Sản phẩm đã có trong giỏ hàng");
//         }

//         // Nếu chưa có, thêm sản phẩm mới vào cartItems và hiển thị thông báo thành công.
//         set({ cartItems: [...currentItems, { item, quantity, color, size }] });
//         toast.success("Đã thêm sản phẩm vào giỏ hàng", { icon: "🛒" });
//       },

//       // Xóa sản phẩm khỏi giỏ:Tạo một danh sách mới newCartItems chỉ chứa các sản phẩm không trùng với idToRemove, sau đó cập nhật cartItems.
//       removeItem: (idToRemove: String) => {
//         const newCartItems = get().cartItems.filter(
//           (cartItem) => cartItem.item._id !== idToRemove
//         );
//         set({ cartItems: newCartItems });
//         toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
//       },

//       // Tăng số lượng sản phẩm:Tìm sản phẩm có item._id trùng với idToIncrease và tăng quantity lên 1.
//       increaseQuantity: (idToIncrease: String) => {
//         const newCartItems = get().cartItems.map((cartItem) =>
//           cartItem.item._id === idToIncrease
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//         set({ cartItems: newCartItems });
//         toast.success("Số lượng mặt hàng tăng lên");
//       },

//       // Giảm số lượng sản phẩm:Tìm sản phẩm có item._id trùng với idToDecrease và giảm quantity xuống 1.
//       decreaseQuantity: (idToDecrease: String) => {
//         const newCartItems = get().cartItems.map((cartItem) =>
//           cartItem.item._id === idToDecrease
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//         );
//         set({ cartItems: newCartItems });
//         toast.success("Số lượng mặt hàng giảm");
//       },

//       // Xóa tất cả sản phẩm trong giỏ hàng:Đặt cartItems thành một mảng trống, tức là xóa toàn bộ giỏ hàng.
//       clearCart: () => set({ cartItems: [] }),
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useCart;




import { create } from "zustand";
import { toast } from "react-hot-toast";
// dữ liệu không bị mất khi người dùng làm mới trang
import { persist, createJSONStorage } from "zustand/middleware";

// Giao diện định nghĩa cấu trúc của một mục hàng trong giỏ
interface CartItem {
  // Thông tin sản phẩm.
  item: ProductType;
  // Số lượng sản phẩm.
  quantity: number;
  color?: string; // ? nghĩa là tuỳ chọn
  size?: string;
}

// Giao diện cho trạng thái giỏ hàng
interface CartStore {
  // Danh sách các sản phẩm trong giỏ.
  cartItems: CartItem[];
  // Các hàm để quản lý và cập nhật giỏ hàng.
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number; // Thêm hàm tính tổng tiền
  formatPrice: (price: number) => string; // Thêm hàm định dạng tiền VND
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      // Thêm sản phẩm vào giỏ.
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );
        // Nếu sản phẩm đã tồn tại trong giỏ
        if (isExisting) {
          return toast("Sản phẩm đã có trong giỏ hàng");
        }

        // Nếu chưa có, thêm sản phẩm mới vào cartItems và hiển thị thông báo thành công.
        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Đã thêm sản phẩm vào giỏ hàng", { icon: "🛒" });
      },

      // Xóa sản phẩm khỏi giỏ.
      removeItem: (idToRemove: String) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: newCartItems });
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      },

      // Tăng số lượng sản phẩm.
      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Số lượng mặt hàng tăng lên");
      },

      // Giảm số lượng sản phẩm.
      decreaseQuantity: (idToDecrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToDecrease
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Số lượng mặt hàng giảm");
      },

      // Xóa tất cả sản phẩm trong giỏ hàng.
      clearCart: () => set({ cartItems: [] }),

      // Tính tổng tiền trong giỏ hàng.
      getTotalPrice: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
          0
        );
      },

      // Định dạng tiền VND.
      formatPrice: (price: number) => {
        return price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
