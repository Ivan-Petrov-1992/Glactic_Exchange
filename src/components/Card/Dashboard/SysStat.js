import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import styled from "styled-components";

const BoxTop = styled(Box)`
  width: 28%;
  z-index: 10;
  position: relative;
  height: 100%;
`;

const Content = styled(Flex)`
  height: 150px;
`;

export default function SysStat({
  title,
  subTitleA,
  subTitleB,
  subTitleC,
  valueA,
  valueB,
  valueC,
  gardient,
}) {
  return (
    <BoxTop>
      <Box
        w="92%"
        bg={gardient}
        h="20%"
        opacity="0.4"
        borderRadius="30px"
        position="absolute"
        top="-8px"
        left="4%"
        zIndex="-1"
      />
      <Box
        w="85%"
        bg={gardient}
        h="20%"
        opacity="0.3"
        borderRadius="30px"
        position="absolute"
        top="-16px"
        left="7.5%"
        zIndex="-1"
      />
      <Center
        bg={gardient}
        h="50px"
        w="100%"
        color="white"
        fontSize="16px"
        borderRadius="30px 30px 0 0"
        border="2px solid #FFFFFF"
        borderTop="0"
        borderBottom="0"
      >
        {title}
      </Center>
      <Content
        w="100%"
        bg="rgba(255, 255, 255, 0.4)"
        border="2px solid #FFFFFF"
        borderTop="0"
        borderRadius="0 0 30px 30px"
        direction="column"
        justify="center"
        align="center"
      >
        <Flex
          w="80%"
          justify="space-between"
          h="30%"
          align="center"
          color="#333333"
        >
          <Text fontSize="14px">{subTitleA}</Text>
          <Text fontSize="14px" fontWeight="600">
            {valueA}
          </Text>
        </Flex>
        <Flex
          w="80%"
          justify="space-between"
          h="30%"
          align="center"
          color="#333333"
        >
          <Text fontSize="14px">{subTitleB}</Text>
          <Text fontSize="14px" fontWeight="bold">
            {valueB}
          </Text>
        </Flex>
        <Flex
          w="80%"
          justify="space-between"
          h="30%"
          align="center"
          color="#333333"
        >
          <Text fontSize="14px">{subTitleC}</Text>
          <Text fontSize="14px" fontWeight="bold">
            {valueC}
          </Text>
        </Flex>
      </Content>
    </BoxTop>
  );
}
