import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";

const Customers = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: "desc" });
  const customerList: (CustomerType & { createdAt?: string })[] = customers.map(
    (customer) => ({
      clerkId: customer.clerkId,
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt?.toISOString(),
    })
  );

  const totalCustomers = customerList.length;
  const uniqueEmails = new Set(customerList.map((customer) => customer.email)).size;
  const recentCustomers = customerList.filter((customer) => {
    if (!customer.createdAt) return false;
    const createdDate = new Date(customer.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdDate >= sevenDaysAgo;
  }).length;
  const latestCustomer = customerList[0];

  return (
    <div className="space-y-10 px-5 py-6 md:px-8">
      <section
        className="collection-hero"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(16, 12, 28, 0.85), rgba(58, 27, 34, 0.6)), url('/nen2.jpg')",
        }}
      >
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="collection-hero__eyebrow">Rubies Clients</p>
            <h1 className="collection-hero__title">
              {latestCustomer?.name || "Khách hàng trung thành"}
            </h1>
            <p className="collection-hero__subtitle">
              {latestCustomer
                ? `Gần nhất đăng ký với email ${latestCustomer.email}.`
                : "Khởi tạo hệ thống khách hàng để giữ liên hệ với cộng đồng Rubies."}
            </p>
            <div className="collection-hero__chips">
              <span>{totalCustomers} khách hàng</span>
              <span>{recentCustomers} gia nhập tuần này</span>
              <span>{uniqueEmails} email duy nhất</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="collection-stat">
          <p>Tổng khách hàng</p>
          <h3>{totalCustomers}</h3>
          <span>Dữ liệu trong kho</span>
        </div>
        <div className="collection-stat">
          <p>Khách mới 7 ngày</p>
          <h3>{recentCustomers}</h3>
          <span>Tăng trưởng gần nhất</span>
        </div>
        <div className="collection-stat">
          <p>Email độc nhất</p>
          <div className="flex items-center justify-between">
            <h3>{uniqueEmails}</h3>
          </div>
          <span>Tiềm năng marketing</span>
        </div>
      </section>

      <section className="collection-table-shell">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="luxe-highlight">Danh sách</p>
            <h2 className="text-heading3-bold text-[#6f3c2f]">
              Khách hàng thân thiết
            </h2>
          </div>
        </div>
        <Separator className="my-4 bg-[#f0dace]" />
        <DataTable columns={columns} data={customerList} searchKey="name" />
      </section>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
