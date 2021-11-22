import { useRef, useState } from "react";
import { Flex, Spacer, Button, VStack, Text, Input } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";
import PaybackModal from "components/Modal/Payback";

export default function DeptCard({ token, setDynamicWith, setDynamicBack, t }) {
  const [showModal, setShowModal] = useState(false);
  const withdrawRef = useRef(null);

  const paybackRef = useRef(null);
  const fetchWithId = (url, id) =>
    axios.get(`${url}?instrument_id=${id}`).then((res) => res.data);
  const { data } = useSWR(
    token ? [process.env.NEXT_PUBLIC_API + "/index/dex/redeem", token] : null,
    fetchWithId,
    { refreshInterval: 1000 }
  );

  const onChangeHandler = () => {
    if (withdrawRef.current.value > data.data.maxTake) {
      withdrawRef.current.value = 0;
      toast.error("😱 Maximum balance reached");
      setDynamicWith(0);
    } else {
      setDynamicWith(withdrawRef.current.value);
    }
  };

  const onPaybackHandler = () => {
    if (paybackRef.current.value > Number(data.data.gUSD_balance)) {
      paybackRef.current.value = 0;
      toast.error("😱 Maximum balance reached");
      setDynamicBack(0);
    } else {
      setDynamicBack(paybackRef.current.value);
    }
  };

  const withdrawHandler = async () => {
    if (!withdrawRef.current.value || withdrawRef.current.value < 0) {
      toast.error("😱 Empty Input detected!");
    } else if (paybackRef.current.value < 0) {
      toast.error("😱 gUsd value not detected!");
    } else if (
      withdrawRef.current.value == 0 &&
      paybackRef.current.value == 0
    ) {
      toast.error("😱 not value detected!");
    } else {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API + "/index/dex/redeemAdd",
          {
            instrument_id: token,
            pledge: withdrawRef.current.value,
            gUSD: paybackRef.current.value,
            type: "redeem",
          }
        );
        if (res.data.code !== "200") {
          toast.error(`😱 ${res.data.msg}`);
        } else {
          toast.info(
            `😀 Successfully withdrawed ${withdrawRef.current.value} ${token} and payback ${paybackRef.current.value} gUSD `
          );
        }
      } catch (error) {
        toast.error(error);
      }
      withdrawRef.current.value = 0;
      paybackRef.current.value = 0;
      setDynamicWith(0);
      setDynamicBack(0);
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
            {t().staking.withdraw}
          </Text>
          <Spacer />
          {data ? (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              {t().staking.withdrawable}: {data.data.maxTake.toFixed(2)} {token}
            </Text>
          ) : (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              Loading...
            </Text>
          )}
        </Flex>
        <Flex w="100%" pl=".8rem">
          <Input
            onChange={onChangeHandler}
            type="number"
            ref={withdrawRef}
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
              withdrawRef.current.value = Number(data.data.maxTake);
              setDynamicWith(withdrawRef.current.value);
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
            {t().staking.payback}
          </Text>
          <Spacer />
          {data ? (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              {t().staking.balance}: {Number(data.data.gUSD_balance).toFixed(2)}{" "}
              gUSD
            </Text>
          ) : (
            <Text color="#666666" m="0" fontSize="1rem" pr="2rem">
              Loading...
            </Text>
          )}
        </Flex>
        <Flex w="100%" pl=".8rem">
          <Input
            type="number"
            onChange={onPaybackHandler}
            ref={paybackRef}
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
              paybackRef.current.value = Number(data.data.gUSD_balance);
              setDynamicBack(paybackRef.current.value);
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
      <Flex w="82%" justify="flex-end">
        <Text
          cursor="pointer"
          fontSize="1rem"
          m="0 0 0 1.5rem"
          color="#5e51f2"
          onClick={() => setShowModal(true)}
        >
          {t().staking.close}
        </Text>
        <PaybackModal
          close={() => setShowModal(false)}
          show={showModal}
          redeemData={data}
          token={token}
        />
      </Flex>
      <Button
        onClick={withdrawHandler}
        width="82%"
        bg="#625FF5"
        borderRadius="12px"
        outline="none"
        color="white"
        height="12%"
        border="0"
        cursor="pointer"
        fontSize="20px"
        mt="1rem"
        transition="transfrom .2s ease-in-out"
        _hover={{ boxShadow: `3px 3px 10px #625FF5, -3px -3px 10px #625FF5` }}
        _active={{ transform: `scale(1.02)` }}
      >
        {t().staking.confirm}
      </Button>
    </Flex>
  );
}
