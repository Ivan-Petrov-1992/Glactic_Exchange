import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Buy from "components/Card/Exchange/Buy";
import dynamic from "next/dynamic";
import Sell from "components/Card/Exchange/Sell";
import RecentList from "components/Card/Exchange/RecentList";
import axios from "axios";
import useSWR from "swr";

const Kline = dynamic(() => import("../../Chart/Kline"), {
  ssr: false,
});

export default function AssetOperation({ asset, t }) {
  const [interval] = useState("1");
  const fetchWithId = (url, id) =>
    axios.get(`${url}?instrument_id=${id}`).then((res) => res.data);

  const fetchKline = (url, id) =>
    axios
      .get(`${url}?symbol=${id}&from&to&resolution=${interval}`)
      .then((res) => res.data);

  const { data } = useSWR(
    asset ? [process.env.NEXT_PUBLIC_API + "index/dex/account", asset] : null,
    fetchWithId,
    { refreshInterval: 1000 }
  );

  const { data: kline } = useSWR(
    asset
      ? [
          process.env.NEXT_PUBLIC_API + "/index/kline/history",
          asset.slice(0, -5),
          interval,
        ]
      : null,
    fetchKline
  );
  return (
    <Flex w="99.5%" wrap="wrap" ml=".5%">
      <Flex w="79%" mt="10px" direction="column" bg="#22222B">
        <Flex w="98%" h="400px" ml="1%" mt="10px">
          {kline ? <Kline data={kline} symbol={asset} /> : null}
        </Flex>
        <Flex w="100%" mt="1rem" pb="2rem">
          {data ? (
            <>
              <Buy token={asset} balance={data.data.gUSD_balance} t={t} />
              <Sell token={asset} balance={data.data.gValue_balance} t={t} />
            </>
          ) : (
            <>
              <Buy token={asset} t={t} />
              <Sell token={asset} t={t} />
            </>
          )}
        </Flex>
      </Flex>
      <Flex w="20.5%" direction="column" ml=".5%" bg="#22222B" mt="10px">
        <Text color="#FFFFFF" m="1rem 0 0 15px" fontWeight="600">
          Trading History
        </Text>
        <RecentList type="1" token={asset} t={t} />
        <RecentList type="2" token={asset} t={t} />
      </Flex>
    </Flex>
  );
}
