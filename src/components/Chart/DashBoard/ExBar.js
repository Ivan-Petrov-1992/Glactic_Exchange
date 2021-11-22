import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height="70%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 15,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="BarChart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#625FF5" stopOpacity={0.5} />
            <stop offset="90%" stopColor="#625FF5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={{ stroke: "#D9D9D9" }}
          strokeWidth="2px"
        />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: "12px", border: "1px solid #3735A9" }}
          labelStyle={{ color: "#333333" }}
          itemStyle={{ color: "#FB6A64" }}
          cursor={false}
        />
        <Bar
          dataKey="amout"
          fill="url(#BarChart)"
          maxBarSize={20}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
