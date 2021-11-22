import { Flex, Spacer, Button, VStack, Text, Input } from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function DeptCard({
  token,
  setDynamicStake,
  setDynamicBorrow,
  t,
}) {
  const fetchWithId = (url, id) =>
    axios.get(`${url}?instrument_id=${id}`).then((res) => res.data);
  const { data } = useSWR(
    token ? [process.env.NEXT_PUBLIC_API + "/index/dex/borrow", token] : null,
    fetchWithId,
    { refreshInterval: 1000 }
  );
  const inputRef = useRef();
  const gusdRef = useRef();
  const onChangeHandler = () => {
    if (Number(inputRef.current.value) > data.data.balance) {
      inputRef.current.value = "";
      toast.error("😱 Maximum balance reached");
      setDynamicStake(0);
    } else {
      setDynamicStake(inputRef.current.value);
    }
  };
  const withChangeHandler = () => {
    if (data.data.maxLoan > 0 && gusdRef.current.value >= 0) {
      setDynamicBorrow(gusdRef.current.value);
    }
  };

  const confirmHandler = async () => {
    if (!inputRef.current.value || inputRef.current.value < 0) {
      toast.error("😱 Empty Input detected!");
    } else if (!gusdRef.current.value || gusdRef.current.value <= 0) {
      toast.error("😱 gUsd value not detected!");
    } else {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API + "/index/dex/borrowAdd",
          {
            instrument_id: token,
            borrowNum: inputRef.current.value,
            gUSD: gusdRef.current.value,
          }
        );
        if (res.data.code !== "200") {
          toast.error(`😱 ${res.data.msg}`);
        } else {
          toast.info(
            `😀 Successfully deposited ${inputRef.current.value} ${token} `
          );
        }
      } catch (err) {
        toast.error(err);
      }
      inputRef.current.value = 0;
      gusdRef.current.value = 0;
      setDynamicStake(0);
      setDynamicBorrow(0);
    }
  };
  return (
    <Flex
      bg="rgba(255, 255, 255, 0.5)"
      width="500px"
      height="450px"
      borderRadius="30px"
      direction="column"
      border="3px solid #ffffff"
      align="center"
      mb="2rem !important"
    >
      <VStack
        bg="white"
        width="85%"
        height="23%"
        borderRadius="20px"
        mt="3rem"
        spacing="20px"
        justify="center"
      >
        <Flex w="100%">
          <Text color="#666666" fontSize="1rem" m="0" pl="2rem">
            {t().staking.deposit}
          </Text>
          <Spacer />
          {data ? (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              {t().staking.balance}: {Number(data.data.balance).toFixed(2)}
              {token}
            </Text>
          ) : (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              Loading
            </Text>
          )}
        </Flex>
        <Flex w="100%" pl=".8rem">
          <Input
            type="number"
            ref={inputRef}
            onChange={onChangeHandler}
            pl="1.5rem"
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
            fontSize="1rem"
            onClick={() => {
              inputRef.current.value = Number(data.data.balance);
              setDynamicStake(inputRef.current.value);
            }}
          >
            {t().staking.max}
          </Text>
        </Flex>
      </VStack>
      <VStack
        bg="white"
        width="85%"
        height="23%"
        borderRadius="20px"
        mt="2rem"
        spacing="20px"
        justify="center"
      >
        <Flex w="100%">
          <Text color="#666666" fontSize="1rem" m="0" pl="2rem">
            {t().staking.borrow}
          </Text>
          <Spacer />
          {data ? (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              {t().staking.generatable}: {data.data.maxLoan.toFixed(2)} gUSD
            </Text>
          ) : (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              Loading...
            </Text>
          )}
        </Flex>
        <Flex w="100%" pl=".8rem">
          <Input
            ref={gusdRef}
            onChange={withChangeHandler}
            pl="1.5rem"
            fontSize="20px"
            fontWeight="bold"
            outline="none"
            type="number"
            border="0"
          />
          <Spacer />
          <Text
            color="#666666"
            m="0"
            pr="2rem"
            cursor="pointer"
            fontSize="1rem"
            onClick={() => {
              gusdRef.current.value = Number(data.data.maxLoan);
              setDynamicBorrow(gusdRef.current.value);
            }}
          >
            {t().staking.max}
          </Text>
        </Flex>
      </VStack>
      <Flex width="82%" mt=".5rem" justify="center">
        <Text fontSize="1rem" color="#666666">
          {t().staking.GasFee}
        </Text>
        <Text cursor="pointer" fontSize="1rem" ml="1.5rem" color="#5e51f2">
          {t().staking.edit}
        </Text>
        <Spacer />
        <Text fontSize="1rem" color="#666666">
          NA Gwei
        </Text>
      </Flex>
      <Button
        onClick={confirmHandler}
        width="82%"
        bg="#625FF5"
        borderRadius="12px"
        outline="none"
        color="white"
        height="12%"
        border="0"
        cursor="pointer"
        fontSize="20px"
        mt="1.5rem"
        transition="transfrom .2s ease-in-out"
        _hover={{ boxShadow: `3px 3px 10px #625FF5, -3px -3px 10px #625FF5` }}
        _active={{ transform: `scale(1.02)` }}
      >
        {t().staking.confirm}
      </Button>
    </Flex>
  );
}
