// type CollectionType = {
//   _id: string;
//   title: string;
//   products: number;
//   image: string;
// };

// type ProductType = {
//   _id: string;
//   title: string;
//   description: string;
//   media: [string];
//   category: string;
//   collections: [string];
//   tags: [string];
//   price: number;
//   cost: number;
//   sizes: [string];
//   colors: [string];
//   createdAt: string;
//   updatedAt: string;
// };

// type UserType = {
//   clerkId: string;
//   wishlist: [string];
//   createdAt: string;
//   updatedAt: string;
// };

// type OrderType = {
//   shippingAddress: Object;
//   _id: string;
//   customerClerkId: string;
//   products: [OrderItemType]
//   shippingRate: string;
//   totalAmount: number
// }

// type OrderItemType = {
//   product: ProductType;
//   color: string;
//   size: string;
//   quantity: number;
//   _id: string;
// }






type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  description?: string;  // Làm trường mô tả tùy chọn
  media: string[];  // Mảng các chuỗi (URL hình ảnh hoặc các loại media khác)
  category: string;
  collections: string[];  // Mảng chứa ID các bộ sưu tập
  tags: string[];  // Mảng chứa các tag
  price: number;
  cost: number;
  sizes: string[];  // Mảng chứa các kích thước có sẵn
  colors: string[];  // Mảng chứa các màu sắc có sẵn
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  clerkId: string;
  wishlist: string[];  // Mảng chứa ID sản phẩm trong wishlist
  createdAt: string;
  updatedAt: string;
};

type ShippingAddressType = {
  street: string;
  city: string;
  state?: string;  // Tùy chọn (có thể không cần thiết với một số quốc gia)
  postalCode: string;
  country: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
};

type OrderType = {
  shippingAddress: ShippingAddressType;  // Sử dụng ShippingAddressType ở đây
  _id: string;
  customerClerkId: string;
  products: OrderItemType[];  // Mảng chứa các mặt hàng trong đơn hàng
  shippingRate: string;
  totalAmount: number;  // Tổng giá trị tính từ quantity * price của tất cả mặt hàng
};
