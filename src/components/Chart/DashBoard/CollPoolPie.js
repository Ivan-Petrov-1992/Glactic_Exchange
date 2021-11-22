import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#625FF5", "#F9934A", "#9D79FF", "#F4BB0B"];

export default function CollPoolPie({ data }) {
  const [pieData, setPieData] = useState([
    { name: "Gala", value: 0 },
    { name: "BTC", value: 0 },
    { name: "ETH", value: 0 },
    { name: "BNB", value: 0 },
  ]);
  useEffect(() => {
    if (data) {
      setPieData([
        { name: "Gala", value: data.GALAPledgePoolRatio * data.totalStaking },
        { name: "BTC", value: data.BTCPledgePoolRatio * data.totalStaking },
        { name: "ETH", value: data.ETHPledgePoolRatio * data.totalStaking },
        { name: "BNB", value: data.BNBPledgePoolRatio * data.totalStaking },
      ]);
    }
  }, [data]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{ borderRadius: "12px", border: "1px solid #625FF5" }}
          labelStyle={{ color: "#333333" }}
          itemStyle={{ color: "#FB6A64" }}
        />
        <Pie data={pieData} innerRadius="48%" outerRadius="60%" dataKey="value">
          {pieData.map((entry, index) => (
            <Cell
              stroke="none"
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
