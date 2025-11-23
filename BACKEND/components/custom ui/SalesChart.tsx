"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";

import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

// Hàm định dạng tiền Việt
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

type ChartData = {
  name: string;
  sales: number;
};

const goldStroke = "#f3c98b";
const emberStroke = "#ad5a3b";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value as number;

  return (
    <div className="rounded-2xl border border-[#f5d39a]/60 bg-[#2b1914]/90 px-4 py-3 text-white shadow-2xl backdrop-blur">
      <p className="text-[10px] uppercase tracking-[0.4em] text-[#f5c07b]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-white">
        {formatCurrency(value)}
      </p>
    </div>
  );
};

const formatAxisValue = (value: number | string) => {
  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(value);
  if (Number.isNaN(numericValue)) return String(value);
  return `${Math.round(numericValue / 1000)}k`;
};

const SalesChart = ({ data }: { data: ChartData[] }) => (
  <div className="chart-panel">
    <ResponsiveContainer width="100%" height={360}>
      <LineChart
        data={data}
        margin={{ top: 15, right: 30, bottom: 5, left: 10 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={goldStroke} stopOpacity={0.9} />
            <stop offset="100%" stopColor={emberStroke} stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="rgba(255,255,255,0.07)"
          strokeDasharray="0"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "#fbe7c4", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
        />
        <YAxis
          tickFormatter={formatAxisValue}
          tick={{ fill: "#fbe7c4", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ fill: "#fff", stroke: goldStroke, strokeWidth: 2, r: 5 }}
          activeDot={{
            r: 7,
            strokeWidth: 2,
            stroke: "#fff",
            fill: goldStroke,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
   
  </div>
);

export default SalesChart;
