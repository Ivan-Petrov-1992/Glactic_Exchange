import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { OrderHistoryData } from "constants/data";
import axios from "axios";
import useSWR from "swr";
import styled from "styled-components";
import Pagination from "components/Pagination";

const Detail = styled.p`
  width: ${(props) => props.w};
  color: #FFFFFF;
  font-size: 1rem;
  margin: 0;
`;

export default function OrderHistory({ t }) {
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const fetcher = (url, page) =>
    axios.get(`${url}?page=${page}`).then((res) => res.data);
  const { data } = useSWR(
    current
      ? [process.env.NEXT_PUBLIC_API + "/index/dex/order", current]
      : null,
    fetcher,
    { refreshInterval: 2000 }
  );
  useEffect(() => {
    if (data) {
      setCount(data.data.num);
    }
  }, [data]);

  return (
    <Flex
      w="99.5%"
      ml=".5%"
      mt=".5%"
      direction="column"
      bg="#22222B"
      align="center"
    >
      <Flex w="96%" mt="1rem" h="max-content" direction="column">
        <Text fontWeight="bold" fontSize="16px" m="0" color="#FFFFFF">
          {t().gAsset.history}
        </Text>
        <Flex w="100%" mt="1.5rem">
          {OrderHistoryData.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item === "type" ? (
                  <Text
                    w="10%"
                    m="0"
                    textAlign="left"
                    fontSize="14px"
                    color="#ffffff"
                  >
                    {t().gAsset[item]}
                  </Text>
                ) : item.includes("date") ? (
                  <Text
                    w="26.5%"
                    m="0"
                    textAlign="left"
                    fontSize="14px"
                    color="#ffffff"
                  >
                    {t().gAsset[item]}
                  </Text>
                ) : (
                  <Text
                    w="18.5%"
                    m="0"
                    textAlign="left"
                    fontSize="14px"
                    color="#ffffff"
                  >
                    {t().gAsset[item]}
                  </Text>
                )}
              </React.Fragment>
            );
          })}
        </Flex>
        {data ? (
          <Flex w="100%" h="170px" direction="column">
            {data.data.list.map((item) => {
              return (
                <Flex w="100%" key={item.id} mt="1rem">
                  {item.type === 2 ? (
                    <Detail w="10%">Sell</Detail>
                  ) : (
                    <Detail w="10%">Buy</Detail>
                  )}
                  <Detail w="26.5%">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: false,
                    }).format(item.addtime * 1000)}
                  </Detail>
                  <Detail w="18.5%">{item.instrument_id.slice(0, -5)}</Detail>
                  <Detail w="18.5%">${Number(item.price)}</Detail>
                  <Detail w="18.5%">{Number(item.amount)}</Detail>
                  <Detail w="18.5%">${Number(item.fee).toFixed(2)}</Detail>
                  {item.status === 2 ? (
                    <Detail w="18.5%">Success</Detail>
                  ) : item.status === 1 ? (
                    <Detail w="18.5%">Progressive</Detail>
                  ) : (
                    <Detail w="18.5%">Fail</Detail>
                  )}
                  <Detail w="18.5%">{item.hash.slice(0, 4)}</Detail>
                </Flex>
              );
            })}
          </Flex>
        ) : (
          <Flex w="100%" h="170px">
            loading...
          </Flex>
        )}
      </Flex>
      {count > 0 && <Pagination count={count} setCurrent={setCurrent} />}
    </Flex>
  );
}
