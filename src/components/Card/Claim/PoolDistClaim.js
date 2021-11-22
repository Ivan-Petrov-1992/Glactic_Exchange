import React from "react";
import { Flex, HStack, VStack, Text } from "@chakra-ui/react";
import ClaimButton from "components/Button/ClaimButton";
import { ClaimData } from "constants/data";

export default function PoolDistClaim() {
  return (
    <>
      <Flex h="100%" w="100%" align="center" justify="center">
        <Flex w="80%">
          <HStack w="100%" spacing="2vw">
            <VStack align="left">
              <Text
                mt="1rem !important"
                fontSize=".9vw"
                color="#333330"
                fontWeight="bold"
              >
                Stake
              </Text>
            </VStack>
            {ClaimData.Stake.map((item, index) => {
              return (
                <VStack align="left" key={index}>
                  <Text fontSize=".9vw" color="#333330">
                    {item}
                  </Text>
                  <Text fontSize="1.1vw" color="#333330" fontWeight="bold">
                    150
                  </Text>
                </VStack>
              );
            })}
          </HStack>
        </Flex>
        <ClaimButton> Claim </ClaimButton>
      </Flex>
    </>
  );
}
