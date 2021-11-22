import React from "react";
import styled from "styled-components";
import { Flex, Text } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TokenCard = styled(Flex)`
  background: ${(props) => props.bg};
  width: 30%;
  height: 100%;
  border-radius: 12px;
  flex-direction: column;
  position: relative;
`;

const AbsImg = styled(LazyLoadImage)`
  position: absolute;
  bottom: 8%;
  right: 5%;
  width: 4.5vw;
  height: auto;
`;

export default function TokenBanner({ bg, title, sFee, icon, bgImg, t }) {
  return (
    <TokenCard bg={bg}>
      <AbsImg src={bgImg} alt="" />
      <Flex w="100%" h="33.3%" p="2rem 0 0 4%" align="center">
        <LazyLoadImage
          alt=""
          src={icon}
          style={{ width: "30px", height: "auto" }}
        />
        <Text color="#FFFFFF" m="0" fontSize="16px">
          {title}
        </Text>
      </Flex>
      <Flex w="90%" h="33.3%" align="flex-end" ml="5%">
        <Text fontSize="20px" fontWeight="600" color="#333333" m="0">
          {t().stake.apy}
        </Text>
      </Flex>
      <Flex w="90%" h="33.3%" justify="space-between" ml="5%">
        <Flex>
          <Text color="#333333" mr="5px">
            {t().stake.sFee}
          </Text>
          <Text >{sFee}</Text>
        </Flex>
        <Flex>
          <Text color="#333333" mr="5px">
            {t().stake.rFee}
          </Text>
          <Text>{sFee}</Text>
        </Flex>
      </Flex>
    </TokenCard>
  );
}
