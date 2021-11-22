import React, { useRef, useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { getActualGasset } from "utils/math";
import useSWR from "swr";

const Input = styled.input`
  outline: none;
  border: 0;
  background: transparent;
  font-size: 14px;
  margin: 1rem 0;
  width: 100%;
  background: #2e2e38;
  border-radius: 5px;
  height: 40px;
`;

const Leverage = styled(Button)`
  width: 25% !important;
  outline: none !important;
  cursor: pointer;
  border-left: 0;
  background: transparent;
  color: #ffffff;
  &:hover {
    background-color: #0dad92;
  }
  &:focus {
    background-color: #0dad92;
  }
`;

export default function Buy({ token, balance, t }) {
  const [max, setMax] = useState(0);
  const [price, setPrice] = useState(0);
  const inputRef = useRef(null);
  const baseURL = `${process.env.NEXT_PUBLIC_API}/index/dex/instrument?&keyword=${token}`;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(baseURL, fetcher);
  useEffect(() => {
    if (data) {
      setPrice(data.data[0].mark_price);
    }
  }, [data]);

  const onClickHandler = (ratio) => {
    if (balance) {
      inputRef.current.value = balance * ratio;
      setMax(getActualGasset(inputRef.current.value, 0.003, price));
    } else {
      inputRef.current.value = 0;
    }
  };
  const onChangeHandler = () => {
    setMax(getActualGasset(inputRef.current.value, 0.003, price));
  };

  const submitHandler = async () => {
    if (!inputRef.current.value || inputRef.current.value <= 0) {
      toast.error("😱 Empty Input detected!");
    } else if (Number(inputRef.current.value) > Number(balance)) {
      toast.error("😱 Maximum balance reached");
      inputRef.current.value = 0;
    } else {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API + "index/dex/trade",
          {
            instrument_id: token,
            type: 1,
            amount: inputRef.current.value,
            hash: "random hash",
          }
        );
        if (res.data.code !== "200") {
          toast.error(`😱 ${res.data.message}`);
        } else {
          toast.info(
            `😀 Successfully purchased ${inputRef.current.value} ${token}`
          );
        }
      } catch (error) {
        toast.error(error);
      }
      inputRef.current.value = 0;
      setMax(0);
    }
  };
  return (
    <Flex w="50%" direction="column" align="center">
      <Flex w="90%" justify="space-between">
        <Text color="#FFFFFF" m="0">
          {t().gAsset.buy}
        </Text>
        {balance ? (
          <Text m="0" fontSize="16px" color="#FFFFFF">
            {Number(balance).toFixed(2)} gUSD
          </Text>
        ) : (
          <Text m="0" fontSize="16px">
            Loading...
          </Text>
        )}
      </Flex>
      <Flex w="90%">
        <Input
          type="number"
          placeholder={t().gAsset.pholder}
          ref={inputRef}
          onChange={onChangeHandler}
        />
      </Flex>
      <Flex w="90%" justify="center" h="30px">
        <Leverage
          borderRight="1px solid #979797"
          borderTop="1px solid #979797"
          borderRadius="8px 0 0 8px"
          borderBottom="1px solid #979797"
          borderLeft="1px solid #979797"
          onClick={() => onClickHandler(0.25)}
        >
          25%
        </Leverage>
        <Leverage
          borderRight="1px solid #979797"
          borderTop="1px solid #979797"
          borderBottom="1px solid #979797"
          onClick={() => onClickHandler(0.5)}
        >
          50%
        </Leverage>
        <Leverage
          borderRight="1px solid #979797"
          borderTop="1px solid #979797"
          borderBottom="1px solid #979797"
          onClick={() => onClickHandler(0.75)}
        >
          75%
        </Leverage>
        <Leverage
          borderTop="1px solid #979797"
          borderBottom="1px solid #979797"
          borderRight="1px solid #979797"
          borderRadius="0 8px 8px 0"
          onClick={() => onClickHandler(1)}
        >
          {t().gAsset.max}
        </Leverage>
      </Flex>
      <Flex direction="column" w="90%" gridRowGap="10px" mt="1.5rem">
        <Flex justify="space-between" w="100%">
          <Text color="#FFFFFF" m="0">
            {t().gAsset.gasF}
          </Text>
          <Text m="0" fontSize="16px" color="#FFFFFF">
            0
          </Text>
        </Flex>
        <Flex justify="space-between" w="100%">
          <Text color="#FFFFFF" m="0">
            {t().gAsset.receive}
          </Text>
          {token ? (
            <Text m="0" fontSize="16px" color="#FFFFFF">
              {Number(max.toFixed(5))} {token.slice(0, -5)}
            </Text>
          ) : null}
        </Flex>
      </Flex>
      <Button
        w="90%"
        h="40px"
        mt="1.5rem"
        outline="none"
        border="0"
        bg="#0DAD92"
        color="white"
        borderRadius="8px"
        cursor="pointer"
        transition="transform .2s ease-in-out"
        _hover={{ transform: `scale(1.02)` }}
        onClick={submitHandler}
      >
        {t().gAsset.place}
      </Button>
    </Flex>
  );
}
