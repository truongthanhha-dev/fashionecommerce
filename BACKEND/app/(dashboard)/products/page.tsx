"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/products/ProductColumns";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

const Products = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  // gọi API để lấy danh sách sản phẩm từ đường dẫn /api/products
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const totalProducts = products.length;
  const categoriesCovered = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ].length;
  const collectionsCovered = [
    ...new Set(
      products.flatMap((product) =>
        product.collections?.map((collection) => collection.title)
      )
    ),
  ].length;

  const averagePrice = useMemo(() => {
    if (!totalProducts) return 0;
    const sum = products.reduce((acc, product) => acc + product.price, 0);
    return Math.round(sum / totalProducts);
  }, [products, totalProducts]);

  const featuredProduct = products[0];
  const featuredImage =
    featuredProduct?.media?.[0] ||
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80";

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-10 px-5 py-6 md:px-8">
      <section
        className="collection-hero"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(16, 14, 25, 0.85), rgba(73, 30, 25, 0.65)), url('${featuredImage}')`,
        }}
      >
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="collection-hero__eyebrow">Rubies Atelier</p>
            <h1 className="collection-hero__title">
              {featuredProduct?.title || "New Product Chapter"}
            </h1>
            <p className="collection-hero__subtitle">
              {featuredProduct
                ? `Thiết kế thuộc danh mục ${featuredProduct.category} với mức giá ${formatCurrency(
                    featuredProduct.price
                  )}.`
                : "Hãy tạo sản phẩm đầu tiên để mở màn BST mới."}
            </p>
            <div className="collection-hero__chips">
              <span>{totalProducts} sản phẩm</span>
              <span>{categoriesCovered} danh mục</span>
              <span>{collectionsCovered} bộ sưu tập</span>
            </div>
          </div>
          <Button
            className="collection-hero__cta"
            onClick={() => router.push("/products/new")}
          >
            <Plus className="h-4 w-4" />
            <span>Tạo sản phẩm</span>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="collection-stat">
          <p>Tổng sản phẩm</p>
          <h3>{totalProducts}</h3>
          <span>Danh mục đang bán</span>
        </div>
        <div className="collection-stat">
          <p>Giá trung bình</p>
          <h3>{formatCurrency(averagePrice)}</h3>
          <span>Mức giá tham chiếu</span>
        </div>
        <div className="collection-stat">
          <p>Sản phẩm mới nhất</p>
          <div className="flex items-center justify-between">
            <h3>{featuredProduct?.title || "Chưa cập nhật"}</h3>
            <ArrowUpRight className="text-[#d1795a]" />
          </div>
          <span>
            {featuredProduct
              ? formatCurrency(featuredProduct.price)
              : "Tạo mới để cập nhật"}
          </span>
        </div>
      </section>

      <section className="collection-table-shell">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="luxe-highlight">Danh sách</p>
            <h2 className="text-heading3-bold text-[#6f3c2f]">Quản lý sản phẩm</h2>
          </div>
        </div>
        <Separator className="my-4 bg-[#f0dace]" />
        <DataTable columns={columns} data={products} searchKey="title" />
      </section>
    </div>
  );
};

export default Products;
