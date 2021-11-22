import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#35277E", "#625FF5", "#FF9E00", "#68BEFC", "#FC7666"];

export default function GassetPie({ data }) {
  return (
    <ResponsiveContainer width="80%" height="80%">
      <PieChart>
        <Pie
          data={data}
          innerRadius="73%"
          outerRadius="80%"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              stroke="none"
              cornerRadius={20}
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
