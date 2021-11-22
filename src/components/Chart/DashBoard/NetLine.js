import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useSWR from "swr";
import axios from "axios";

export default function NetLine() {
  const [line, setLine] = useState([]);
  const fetchKline = (url) =>
    axios
      .get(`${url}?symbol=gGALA&from&to&resolution=1W`)
      .then((res) => res.data);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/kline/history",
    fetchKline
  );
  useEffect(() => {
    if (data) {
      let lineData = [];
      for (let i = 0; i < 10; i++) {
        lineData.push({
          time: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
          }).format(data.t[i] * 1000),
          price: data.o[i],
        });
      }
      setLine(lineData);
    }
  }, [data]);
  return (
    <ResponsiveContainer width="100%" height="75%">
      <AreaChart
        data={line}
        margin={{
          top: 5,
          right: 40,
          left: 40,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="gala-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3735A9" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#3735A9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: "12px", border: "1px solid #3735A9" }}
          labelStyle={{ color: "#333333" }}
          itemStyle={{ color: "#FB6A64" }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#3735A9"
          activeDot={{ r: 8 }}
          fill={"url(#gala-line)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
