import React from "react";
import { Text, Flex, VStack, Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const NetLine = dynamic(() => import("../../Chart/DashBoard/NetLine"), {
  ssr: false,
});

export default function Network({ t, data }) {
  return (
    <Flex direction="column" w="95%" ml="4%" my="2rem">
      <Text color="#333333" fontSize="18px" fontWeight="bold">
        {t().dashboard.net}
      </Text>
      <Flex
        w="96%"
        h="420px"
        bg="rgba(255, 255, 255, 0.4)"
        borderRadius="30px"
        border="2px solid #FFFFFF"
        direction="column"
      >
        <Flex w="100%" h="20%" mt="1rem" align="center" pl="30px">
          <VStack w="max-content" align="left" spacing="1rem">
            <Text m="0" color="#666666" fontSize="14px">
              {t().dashboard.price}
            </Text>
            <Text color="#333333" fontSize="18px" fontWeight="bold" m="0">
              ${Number(data[0].mark_price)}
            </Text>
          </VStack>
          {data[0].mark_price - data[0].open_24h > 0 ? (
            <Center
              w="5vw"
              h="30px"
              bg="#0DAD92"
              borderRadius="4px"
              color="white"
              ml="1rem"
              mt="2rem"
            >
              {(
                (data[0].mark_price - data[0].open_24h) /
                data[0].open_24h
              ).toFixed(2)}
              %
            </Center>
          ) : (
            <Center
              w="5vw"
              h="30px"
              bg="#FB6A64"
              borderRadius="4px"
              color="white"
              ml="1rem"
              mt="2rem"
            >
              {(
                (data[0].mark_price - data[0].open_24h) /
                data[0].open_24h
              ).toFixed(2)}
              %
            </Center>
          )}
          <VStack w="max-content" ml="2rem" align="left" spacing="1.5rem">
            <Text m="0" color="#666666" fontSize="14px">
              {t().dashboard.high}
            </Text>
            <Text m="0" color="#666666" fontSize="14px">
              {t().dashboard.low}
            </Text>
          </VStack>

          <VStack w="max-content" ml="2rem" align="left" spacing="1rem">
            <Text color="#333333" fontSize="18px" fontWeight="bold" m="0">
              ${Number(data[0].highest)}
            </Text>
            <Text color="#333333" fontSize="18px" fontWeight="bold" m="0">
              ${Number(data[0].lowest)}
            </Text>
          </VStack>
        </Flex>
        <NetLine />
      </Flex>
    </Flex>
  );
}
