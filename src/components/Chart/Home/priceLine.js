import React, { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={line}
        margin={{
          right: 20,
          left: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <defs>
          <linearGradient id="NetLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0DAD92" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#0DAD92" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke="#0DAD92"
          activeDot={{ r: 8 }}
          fill={"url(#NetLine)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
