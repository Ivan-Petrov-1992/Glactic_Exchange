import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import styled from "styled-components";
import axios from "axios";
import useSWR from "swr";

const Price = styled.p`
  margin: 0;
  font-size: 1rem;
  min-width: 35%;
  word-break: break-all;
  color: ${(props) => (props.type === "1" ? `#f94c4c` : `#0DAD92`)};
  text-align: left;
`;

const Value = styled.p`
  margin: 0;
  color: ${(props) => props.color};
  font-size: 1rem;
  width: ${(props) => props.l};
  text-align: ${(props) => props.align};
`;

const Title = styled.p`
  margin: 0;
  color: #666666;
  font-size: 1rem;
  width: ${(props) => props.l};
  text-align: ${(props) => props.align};
  font-weight: bold;
`;

export default function RecentList({ type, token, t }) {
  const fetchWithId = (url, id) =>
    axios
      .get(`${url}?instrument_id=${id}&type=${type}`)
      .then((res) => res.data);

  const { data: orderRecord } = useSWR(
    token
      ? [process.env.NEXT_PUBLIC_API + "/index/dex/allOrder", token, type]
      : null,
    fetchWithId,
    { refreshInterval: 1000 }
  );
  return (
    <Flex w="100%" h="320px" mt="1rem" direction="column" px="15px">
      <Flex w="100%">
        <Title l="45%">{t().gAsset.time}</Title>
        <Title l="35%" align="left">
          {t().gAsset.price}
        </Title>
        <Title l="20%" align="right">
          {t().gAsset.amount}
        </Title>
      </Flex>
      <VStack mt="1rem" spacing="10px" align="left" w="100%">
        {orderRecord
          ? orderRecord.data.map((item, index) => {
              return (
                <Flex key={index} textAlign="left">
                  <Value l="45%" align="left" color="#666666">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: false,
                    }).format(item.addtime * 1000)}
                  </Value>
                  <Price type={type}>
                    ${Number(Number(item.price).toFixed(2))}
                  </Price>
                  <Value l="20%" align="right" color="#FFFFFF">
                    {Number(item.amount).toFixed(2)}
                  </Value>
                </Flex>
              );
            })
          : null}
      </VStack>
    </Flex>
  );
}
