// hiển thị danh sách sản phẩm
import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";

// component ProductList
const ProductList = async () => {
  const products = await getProducts();

  // JSX
  return (
    <div className="flex flex-col items-center gap-12 py-12 px-5">
      <p className="text-heading1-bold tracking-wide ">Sản phẩm bán chạy </p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">Không tìm thấy sản phẩm nào</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16 ">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
