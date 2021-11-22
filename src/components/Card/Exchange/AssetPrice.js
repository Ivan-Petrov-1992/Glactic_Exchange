import React from "react";
import { Flex, VStack, Text } from "@chakra-ui/react";
import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";

const Titletext = styled.p`
  font-size: 16px;
  color: ${(props) => props.color};
  margin: 0;
  font-weight: ${(props) => props.weight};
`;

const Container = styled(Flex)`
  flex-shrink: 0;
  margin-left: 0.5%;
`;

export default function AssetPrice({ asset, t }) {
  const fetcher = (url, id) =>
    axios.get(`${url}&keyword=${id}`).then((res) => res.data);
  const { data } = useSWR(
    asset
      ? [process.env.NEXT_PUBLIC_API + "index/dex/instrument", asset]
      : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  return (
    <Container w="99.5%" h="70px" bg="#22222B" align="center">
      {asset ? (
        <Text
          m="0"
          w="10%"
          fontSize="24px"
          fontWeight="bold"
          ml="40px"
          color="#ffffff"
        >
          {asset.slice(0, -5)}
        </Text>
      ) : (
        <Text
          m="0"
          fontSize="1.2vw"
          fontWeight="bold"
          w="15%"
          textAlign="center"
        >
          Loading...
        </Text>
      )}
      {data ? (
        data.data[0].mark_price - data.data[0].open_24h > 0 ? (
          <Text m="0" fontSize="20px" color="#0DAD92" textAlign="center">
            ${data.data[0].mark_price}
          </Text>
        ) : (
          <Text
            m="0"
            fontSize="20px"
            color="#F94C4C"
            w="15%"
            textAlign="center"
          >
            ${data.data[0].mark_price}
          </Text>
        )
      ) : (
        <Text m="0" fontSize="20px" color="#333333" textAlign="center">
          Loading...
        </Text>
      )}
      <VStack w="15%">
        <Titletext color="#B7B7B7">{t().gAsset.high}</Titletext>
        {!data ? (
          <p>Loading</p>
        ) : (
          <Titletext weight="600" color="#FFFFFF">
            ${data.data[0].highest}
          </Titletext>
        )}
      </VStack>
      <VStack w="15%">
        <Titletext color="#B7B7B7">{t().gAsset.low}</Titletext>
        {!data ? (
          <p>Loading</p>
        ) : (
          <Titletext weight="600" color="#FFFFFF">
            ${data.data[0].lowest}
          </Titletext>
        )}
      </VStack>
      <VStack w="15%">
        <Titletext color="#B7B7B7">{t().gAsset.volume}</Titletext>
        {!data ? (
          <p>Loading</p>
        ) : (
          <Titletext weight="600" color="#FFFFFF">
            {data.data[0].volume_24h || 0}
          </Titletext>
        )}
      </VStack>
      <VStack w="15%">
        <Titletext color="#B7B7B7">{t().gAsset.change}</Titletext>
        {!data ? (
          <p>Loading</p>
        ) : data.data[0].mark_price - data.data[0].open_24h > 0 ? (
          <Titletext weight="600" color="#0DAD92">
            {(
              (data.data[0].mark_price - data.data[0].open_24h) /
              data.data[0].mark_price
            ).toFixed(2)}
            %
          </Titletext>
        ) : (
          <Titletext weight="600" color="#F94C4C">
            {(
              (data.data[0].mark_price - data.data[0].open_24h) /
              data.data[0].mark_price
            ).toFixed(2)}
            %
          </Titletext>
        )}
      </VStack>
    </Container>
  );
}
