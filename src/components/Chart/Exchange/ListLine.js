import React, { useEffect, useState } from "react";
import { AreaChart, ResponsiveContainer, Area } from "recharts";
import useSWR from "swr";
import axios from "axios";

const ListLine = ({ name, current, prev }) => {
  const [color, setColor] = useState(null);
  const [line, setLine] = useState([]);
  const fetchKline = (url, id) =>
    axios
      .get(`${url}?symbol=${id}&from&to&resolution=1W`)
      .then((res) => res.data);
  const { data } = useSWR(
    name
      ? [
          process.env.NEXT_PUBLIC_API + "/index/kline/history",
          name.slice(0, -5),
        ]
      : null,
    fetchKline
  );
  useEffect(() => {
    if (data) {
      let lineData = [];
      for (let i = 0; i < data.t.length; i++) {
        lineData.push({ time: data.t[i], price: data.o[i] });
      }
      setLine(lineData);
    }
    if (current > prev) {
      setColor("#0DAD92");
    } else {
      setColor("#F94C4C");
    }
  }, [data]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      {data ? (
        <AreaChart
          width={500}
          height={300}
          data={line}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <defs>
            <linearGradient id="line" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs> */}
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            fill={color}
            fillOpacity={0.1}
          />
        </AreaChart>
      ) : (
        <div></div>
      )}
    </ResponsiveContainer>
  );
};

export default ListLine;
