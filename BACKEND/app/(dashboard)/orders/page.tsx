"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderColumnType[]>([]);

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log("[orders_GET", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = useMemo(
    () => orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0),
    [orders]
  );
  const averageOrder =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const latestOrder = orders[0];

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-10 px-5 py-6 md:px-8">
      <section
        className="collection-hero"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(14, 12, 22, 0.85), rgba(76, 36, 28, 0.6)), url('/nen.jpg')",
        }}
      >
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="collection-hero__eyebrow">Rubies Orders</p>
            <h1 className="collection-hero__title">
              {latestOrder?._id || "Dòng đơn hàng mới"}
            </h1>
            <p className="collection-hero__subtitle">
              {latestOrder
                ? `Khách hàng ${latestOrder.customer}.`
                : "Các đơn hàng sẽ hiển thị tại đây khi hệ thống ghi nhận giao dịch."}
            </p>
            <div className="collection-hero__chips">
              <span>{totalOrders} đơn đã đặt</span>
              <span>{formatCurrency(totalRevenue)} doanh thu</span>
              <span>{formatCurrency(averageOrder)} trung bình</span>
            </div>
          </div>
        </div>
      </section>

   

      <section className="collection-table-shell">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="luxe-highlight">Danh sách</p>
            <h2 className="text-heading3-bold text-[#6f3c2f]">
              Quản lý đơn đặt hàng
            </h2>
          </div>
        </div>
        <Separator className="my-4 bg-[#f0dace]" />
        <DataTable columns={columns} data={orders} searchKey="customer" />
      </section>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;
