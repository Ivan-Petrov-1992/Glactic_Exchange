import React from "react";
import { Center, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styled from "styled-components";
import CardTypo from "components/Typography/CardTypo";

const TokenDisplay = styled(Flex)`
  width: 85%;
  height: 90px;
  border-radius: 10px;
  border-left-width: 10px;
  border-left-style: solid;
  border-left-color: ${(props) => props.bd};
  align-items: center;
`;

const CollPoolPie = dynamic(() => import("../../Chart/DashBoard/CollPoolPie"), {
  ssr: false,
});
export default function CollPool({ data, t }) {
  return (
    <Flex direction="column" w="95%" ml="4%" position="relative" mt="2rem">
      <Text color="#333333" fontSize="18px" fontWeight="bold">
        {t().dashboard.cPool}
      </Text>
      <Center
        w="96%"
        h="420px"
        bg="rgba(255, 255, 255, 0.4)"
        borderRadius="30px"
        border="2px solid #FFFFFF"
      >
        <Flex
          position="absolute"
          w="11.5%"
          h="max-content"
          bg="transparent"
          left="13.5%"
          align="center"
          justify="center"
          direction="column"
        >
          <Text m=".5rem 0 0 0" fontWeight="bold" fontSize="16px">
            {Number(data.totalStaking.toFixed(2))}
          </Text>
          <Text m=".5rem 0 0 0" fontSize="14px">
            {t().dashboard.ts}
          </Text>
          <Text m="2rem 0 0 0" fontWeight="bold" fontSize="16px">
            {data.staker}
          </Text>
          <Text m=".5rem 0 0 0" fontSize="14px">
            {t().dashboard.staker}
          </Text>
        </Flex>
        <Flex w="40%" h="100%">
          {data ? <CollPoolPie data={data} /> : <CollPoolPie />}
        </Flex>
        <Flex w="60%" h="100%" align="center">
          <Flex w="50%" direction="column" align="center" gridRowGap="30px">
            <TokenDisplay bg="rgba(98, 95, 245, 0.1)" bd="#625FF5">
              <LazyLoadImage
                alt=""
                style={{ width: `25px`, height: `auto`, marginLeft: "30px" }}
                src="/dashboard/Gala.png"
                effect="blur"
              />
              <Flex direction="column" ml="30px" gridRowGap="5px">
                <CardTypo color="#1C308B" size="1rem">
                  Gala
                </CardTypo>
                <CardTypo color="#1C308B" size="20px" weight="600">
                  {data.GALAPledgePoolRatio} %
                </CardTypo>
              </Flex>
            </TokenDisplay>
            <TokenDisplay bg="rgba(157, 121, 255, 0.1)" bd="#9D79FF">
              <LazyLoadImage
                alt=""
                style={{ width: `25px`, height: `auto`, marginLeft: "30px" }}
                src="/dashboard/ETH.png"
                effect="blur"
              />
              <Flex direction="column" ml="30px" gridRowGap="5px">
                <CardTypo color="#1C308B" size="1rem">
                  ETH
                </CardTypo>
                <CardTypo color="#1C308B" size="20px" weight="600">
                  {data.ETHPledgePoolRatio} %
                </CardTypo>
              </Flex>
            </TokenDisplay>
          </Flex>
          <Flex w="50%" direction="column" align="center" gridRowGap="30px">
            <TokenDisplay bg="rgba(249, 147, 74, 0.1)" bd="#F9934A">
              <LazyLoadImage
                alt=""
                style={{ width: `25px`, height: `auto`, marginLeft: "30px" }}
                src="/dashboard/BTC.png"
                effect="blur"
              />
              <Flex direction="column" ml="30px" gridRowGap="5px">
                <CardTypo color="#1C308B" size="1rem">
                  BTC
                </CardTypo>
                <CardTypo color="#1C308B" size="20px" weight="600">
                  {data.BTCPledgePoolRatio} %
                </CardTypo>
              </Flex>
            </TokenDisplay>
            <TokenDisplay bg="rgba(244, 187, 11, 0.1)" bd="#F4BB0B">
              <LazyLoadImage
                alt=""
                style={{ width: `25px`, height: `auto`, marginLeft: "30px" }}
                src="/dashboard/BNB.png"
                effect="blur"
              />
              <Flex direction="column" ml="30px" gridRowGap="5px">
                <CardTypo color="#1C308B" size="1rem">
                  BNB
                </CardTypo>
                <CardTypo color="#1C308B" size="20px" weight="600">
                  {data.BNBPledgePoolRatio} %
                </CardTypo>
              </Flex>
            </TokenDisplay>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
}
