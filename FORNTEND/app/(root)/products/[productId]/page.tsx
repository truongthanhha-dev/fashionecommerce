
// hiển thị hình ảnh hoặc video của sản phẩm.
import Gallery from "@/components/Gallery"
// hiển thị thông tin tóm tắt về một sản phẩm
import ProductCard from "@/components/ProductCard"
// hiển thị thông tin chi tiết về sản phẩm
import ProductInfo from "@/components/ProductInfo"
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions"

// Component ProductDetails nhận vào một tham số params, chứa productId của sản phẩm muốn hiển thị.
const ProductDetails = async ({ params }: { params: { productId: string } }) => {
  // Lấy Dữ Liệu
  const productDetails = await getProductDetails(params.productId)
  const relatedProducts = await getRelatedProducts(params.productId)

  // JSX
  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        {/* Hiển thị hình ảnh của sản phẩm */}
        <Gallery productMedia={productDetails.media} />
        {/* Hiển thị thông tin chi tiết của sản phẩm */}
        <ProductInfo productInfo={productDetails} />
      </div>

      {/* dấu gachj ngang ngăn phân cách */}
      <div className="flex justify-center my-3">
        <div className="border-t-2  w-1/2"></div>
      </div>
      {/* giao diện hiển thị danh sách các sản phẩm liên quan */}
      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        {/* Một tiêu đề "Có thể bạn cũng thích" */}
        <p className="text-heading3-bold">Có thể bạn cũng thích</p>
        <div className="flex flex-wrap justify-center gap-16 mx-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export const dynamic = "force-dynamic";

export default ProductDetails