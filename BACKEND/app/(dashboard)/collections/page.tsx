"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Plus } from "lucide-react";

import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
// separator :dấu phẩy, dấu gạch chéo(dùng để tách các phần tử trong một chuỗi)
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<any[]>([]);

  // gọi API để lấy danh sách các bộ sưu tập từ đường dẫn /api/collections.
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const totalCollections = collections.length;
  const totalProducts = collections.reduce(
    (acc, item: any) => acc + (item?.products?.length || 0),
    0
  );
  const latestCollection = collections[0];

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-10 px-5 py-6 md:px-8">
      <section
        className="collection-hero"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(18, 15, 25, 0.85), rgba(92, 51, 38, 0.65)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="collection-hero__eyebrow">Rubies Collections</p>
            <h1 className="collection-hero__title">
              {latestCollection?.title || "Dreamy Bloom Chapter"}
            </h1>
            <p className="collection-hero__subtitle">
              {latestCollection
                ? `Bộ sưu tập sở hữu ${
                    latestCollection?.products?.length || 0
                  } thiết kế đặc quyền.`
                : "Hãy tạo bộ sưu tập đầu tiên để bắt đầu hành trình mới."}
            </p>
            <div className="collection-hero__chips">
              <span>{totalCollections} bộ sưu tập</span>
              <span>{totalProducts} sản phẩm</span>
            </div>
          </div>
          <Button
            className="collection-hero__cta"
            onClick={() => router.push("/collections/new")}
          >
            <Plus className="h-4 w-4" />
            <span>Tạo bộ sưu tập</span>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="collection-stat">
          <p>Tổng bộ sưu tập</p>
          <h3>{totalCollections}</h3>
          <span>Bản phát hành</span>
        </div>
        <div className="collection-stat">
          <p>Tổng sản phẩm</p>
          <h3>{totalProducts}</h3>
          <span>Thiết kế độc bản</span>
        </div>
        <div className="collection-stat">
          <p>Bộ sưu tập mới nhất</p>
          <div className="flex items-center justify-between">
            <h3>{latestCollection?.title || "Chưa cập nhật"}</h3>
            <ArrowUpRight className="text-[#d1795a]" />
          </div>
          <span>
            {latestCollection
              ? `${latestCollection?.products?.length || 0} sản phẩm`
              : "Tạo mới để cập nhật"}
          </span>
        </div>
      </section>

      <section className="collection-table-shell">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="luxe-highlight">Danh sách</p>
            <h2 className="text-heading3-bold text-[#6f3c2f]">
              Quản lý bộ sưu tập
            </h2>
          </div>
        </div>
        <Separator className="my-4 bg-[#f0dace]" />
        <DataTable columns={columns} data={collections} searchKey="title" />
      </section>
    </div>
  );
};

export default Collections;
