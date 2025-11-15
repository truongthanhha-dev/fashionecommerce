import { useRouter } from 'next/navigation';

const CartComponent = () => {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/Checkout'); // Điều hướng tới trang Checkout
  };

  return (
    <button
      className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
      onClick={handleCheckout}
    >
      Tiến hành thanh toán
    </button>
  );
};

export default CartComponent;
