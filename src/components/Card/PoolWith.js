import { useRef } from "react";
import {
  Flex,
  Spacer,
  Button,
  VStack,
  Text,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PoolDept({ t, data }) {
  const inputRef = useRef(null);

  const withdrawHandler = async () => {
    if (!inputRef.current.value || inputRef.current.value <= 0) {
      inputRef.current.value = 0;
      toast.error("😱 Empty Input detected!");
    } else {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API + "/index/dex/stableAdd",
          {
            gUSD: inputRef.current.value,
            type: "withdraw",
          }
        );
        if (res.data.code !== "200") {
          toast.error(res.data.msg);
        } else {
          toast.success(res.data.msg);
        }
      } catch (error) {
        toast.error(error);
      }
      inputRef.current.value = 0;
    }
  };
  const maxHandler = (e) => {
    e.preventDefault();
    if (data) {
      inputRef.current.value = Number(data.data.stable_balance);
    }
  };

  return (
    <Flex
      bg="rgba(255, 255, 255, 0.5)"
      width="540px"
      height="320px"
      borderRadius="30px"
      direction="column"
      border="3px solid #ffffff"
      align="center"
      mt="2rem"
    >
      <VStack
        bg="white"
        width="85%"
        height="30%"
        borderRadius="20px"
        mt="2rem"
        h="100px"
        spacing="0"
      >
        <Flex w="100%" h="50%" align="center">
          <Text color="#666666" fontSize="14px" m="0" pl="2rem">
            gUSD
          </Text>
          <Spacer />
        </Flex>
        <Flex w="100%" h="50%" align="center">
          <Input
            type="number"
            ref={inputRef}
            pl="2rem"
            fontSize="20px"
            fontWeight="bold"
            outline="none"
            border="0"
          />
          <Spacer />
          <Text
            color="#666666"
            m="0"
            pr="2rem"
            cursor="pointer"
            fontSize="14px"
            onClick={maxHandler}
          >
            {t().stable.max}
          </Text>
        </Flex>
      </VStack>
      <Flex width="82%" mt="1rem" justify="center">
        <Text fontSize="14px" color="#666666">
          {t().staking.GasFee}
        </Text>
        <Text cursor="pointer" fontSize="14px" ml="1.5rem" color="#5e51f2">
          {t().stable.edit}
        </Text>
        <Spacer />
        <Text fontSize="14px" color="#333333" fontWeight="bold">
          NA Gwei
        </Text>
      </Flex>
      <Button
        onClick={withdrawHandler}
        width="82%"
        bg="#625FF5"
        borderRadius="12px"
        outline="none"
        color="white"
        height="60px"
        border="0"
        cursor="pointer"
        fontSize="20px"
        mt="1.5rem"
        transition="transfrom .2s ease-in-out"
        _hover={{ boxShadow: `3px 3px 10px #625FF5, -3px -3px 10px #625FF5` }}
        _active={{ transform: `scale(1.02)` }}
      >
        {t().stable.withdraw}
      </Button>
    </Flex>
  );
}
