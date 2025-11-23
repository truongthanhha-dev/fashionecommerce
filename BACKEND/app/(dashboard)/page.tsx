import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const { totalRevenue, totalOrders } = await getTotalSales();
  const totalCustomers = await getTotalCustomers();
  const graphData = await getSalesPerMonth();

  const stats = [
    {
      title: "Tổng doanh thu (VNĐ)",
      value: totalRevenue,
      icon: <CircleDollarSign className="text-[#b57851]" />,
    },
    {
      title: "Tổng số đơn hàng",
      value: totalOrders,
      icon: <ShoppingBag className="text-[#b57851]" />,
    },
    {
      title: "Tổng số khách hàng",
      value: totalCustomers,
      icon: <UserRound className="text-[#b57851]" />,
    },
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between border-none">
              <CardTitle className="text-lg uppercase tracking-[0.2em] text-[#a26444]">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-[#3f2115]">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="gilded-card p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="luxe-highlight">Theo dõi</p>
            <h2 className="text-heading3-bold text-[#6f3c2f]">
              Biểu đồ doanh thu (VNĐ)
            </h2>
          </div>
        </div>
        <div className="mt-6">
          <SalesChart data={graphData} />
        </div>
      </section>
    </div>
  );
}
