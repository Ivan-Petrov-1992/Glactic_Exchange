import React from "react";
import styled from "styled-components";
import { Flex } from "@chakra-ui/react";
import { ExchangeData } from "constants/data";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dynamic from "next/dynamic";

const AssetLine = dynamic(() => import("../../Chart/Exchange/ListLine"), {
  ssr: false,
});

const Tab = styled.p`
  margin: 0;
  color: #333333;
  font-size: 16px;
  font-weight: ${(props) => props.fw};
  width: 20%;
  text-align: center;
`;

const Flucation = styled.p`
  margin: 0;
  color: ${(props) => props.color};
  font-size: 16px;
  width: 20%;
  text-align: center;
`;

const Button = styled.button`
  font-size: 14px;
  width: 90px;
  height: 40px;
  color: #3735a9;
  border-radius: 10px;
  border: 1px solid #625ff5;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

export default function GAssetList({ data, selected, search, t }) {
  const router = useRouter();

  if (!data) {
    return null;
  }
  return (
    <Flex w="95%" mt="2rem" direction="column" gridRowGap="10px">
      <Flex w="100%" h="50px" bg="rgba(98, 95, 245, 0.2)" align="center">
        {ExchangeData.map((item, index) => {
          return (
            <Tab fw="bold" key={index}>
              {t().exchange[item]}
            </Tab>
          );
        })}
      </Flex>
      {data
        .filter((item) => {
          if (!selected && !search) {
            return item;
          } else if (
            selected &&
            !search &&
            item.type.toLowerCase().includes(selected.label.toLowerCase())
          ) {
            return item;
          } else if (
            search &&
            item.instrument_name.toLowerCase().includes(search.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item, index) => {
          return (
            <Flex
              key={index}
              w="100%"
              h="70px"
              bg="rgba(255, 255, 255, 0.7)"
              borderRadius="12px"
              boxShadow="0px 2px 4px 0px rgba(220, 220, 220, 0.5)"
              align="center"
              cursor="pointer"
              _hover={{ transform: `scale(1.02)` }}
              transition="transform .2s ease-in-out"
              onClick={() => {
                router.push(`GAssets?asset=${item.instrument_name}`);
              }}
            >
              <Flex w="20%" align="center" justify="flex-start" pl="7%">
                <LazyLoadImage
                  alt=""
                  src={`/tokens/${item.instrument_name.slice(0, -5)}.png`}
                  style={{ width: "25px", height: "auto", marginRight: "10px" }}
                />
                {item.instrument_name.slice(0, -5)}
              </Flex>

              <Tab>${Number(item.mark_price)}</Tab>
              {item.mark_price - item.open_24h > 0 ? (
                <Flucation color="#0DAD92">
                  {((item.mark_price - item.open_24h) / item.open_24h).toFixed(
                    3
                  )}
                  %
                </Flucation>
              ) : (
                <Flucation color="#F94C4C">
                  {((item.mark_price - item.open_24h) / item.open_24h).toFixed(
                    3
                  )}
                  %
                </Flucation>
              )}
              <Flex w="20%" h="95%" align="center">
                <AssetLine
                  name={item.instrument_name}
                  current={item.mark_price}
                  prev={item.open_24h}
                />
              </Flex>
              <Flex w="20%" justify="center">
                <Button>{t().exchange.buy}</Button>
              </Flex>
            </Flex>
          );
        })}
    </Flex>
  );
}
