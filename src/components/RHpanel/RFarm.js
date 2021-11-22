import React, { useState, useEffect } from "react";
import { Flex, VStack, Text, Center } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Progressive from "components/Progressive";
import useSWR from "swr";
import axios from "axios";
import DropDown from "components/TokenDropdown";
import useComponentVisible from "hooks/useComponentVisible";
import { useRouter } from "next/router";
import styled from "styled-components";
const ResponsiveContainer = styled(Flex)`
  height: 15%;
  @media (min-width: 2000px) {
    height: 10%;
  }
`;

export default function RFarm({
  token,
  dynamicStake,
  dynamicWith,
  dynamicBorrow,
  dynamicBack,
  price,
  t,
}) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const fetchWithId = (url, id) =>
    axios.get(`${url}?instrument_id=${id}`).then((res) => res.data);
  const { data } = useSWR(
    token
      ? [process.env.NEXT_PUBLIC_API + "index/dex/borrowRight", token]
      : null,
    fetchWithId,
    { refreshInterval: 1000 }
  );
  // eslint-disable-next-line no-unused-vars
  const [debt, setDebt] = useState([]);
  const [cRatio, setCratio] = useState(0);
  const router = useRouter();
  const onSelectHandler = (value) => {
    setIsComponentVisible(false);
    router.push(`?token=${value}`);
  };
  useEffect(() => {
    if (data) {
      setCratio(data.data.currentPledgeRatio.toFixed(2));
      setDebt([
        {
          title: t().staking.staked,
          value: Number(
            (
              Number(data.data.pledgeNum) +
              Number(dynamicStake) -
              Number(dynamicWith)
            ).toFixed(5)
          ),
          unit: token,
        },
        //（质押物+Deposit输入值）/(Total Cost+Borrow输入值) *100
        //质押物-Withdraw输入值）/(Total Cost-Payback输入值) *100
        {
          title: t().stake.c_ratio,
          value:
            Number(data.data.personalDebt) > 0
              ? (
                  ((Number(data.data.pledgeNum) +
                    Number(dynamicStake) -
                    Number(dynamicWith)) *
                    price *
                    100) /
                  (Number(data.data.personalDebt) +
                    Number(dynamicBorrow) -
                    Number(dynamicBack))
                ).toFixed(2)
              : 0,
          unit: "%",
        },
        {
          title: t().staking.total,
          value:
            Number(data.data.personalDebt) > 0
              ? (
                  Number(data.data.personalDebt) +
                  Number(dynamicBorrow) -
                  Number(dynamicBack)
                ).toFixed(2)
              : (
                  Number(data.data.personalDebt) + Number(dynamicBorrow)
                ).toFixed(2),

          unit: "USD",
        },
        {
          title: t().staking.deposited,
          value: Number(Number(data.data.depositParam).toFixed(2)),
          unit: "gUSD",
        },
      ]);
    }
  }, [
    data,
    token,
    dynamicStake,
    dynamicWith,
    dynamicBorrow,
    dynamicBack,
    price,
    t,
  ]);
  return (
    <Flex w="280px" h="95%" mt="2rem" direction="column" align="center">
      <Flex w="100%" direction="column" align="center">
        <Center
          w="60px"
          h="60px"
          border="2px solid #FFFFFF"
          bg="rgba(255, 255, 255, 0.5)"
          borderRadius="100px"
        >
          <LazyLoadImage
            alt=""
            src="/NavIcon/MetaMask.png"
            style={{ width: "70%", height: "70%" }}
          />
        </Center>
        <Center
          w="80%"
          mt="2rem"
          h="45px"
          border="2px solid #FFFFFF"
          bg="rgba(255, 255, 255, 0.4)"
          borderRadius="22px"
        >
          <Text color="#333333" mr="2rem">
            0X60d…786f
          </Text>
          <Center bg="rgb(220,212,246)" borderRadius="15px" h="30px" w="40%">
            <Text color="#333333">Mainnet</Text>
          </Center>
        </Center>
        <Center w="100%" mt="2rem" gridColumnGap="40px">
          <LazyLoadImage
            alt="galactic-tool"
            src="/tools/copy.png"
            style={{ width: "20px", height: "20px" }}
          />
          <LazyLoadImage
            alt="galactic-tool"
            src="/tools/forward.png"
            style={{ width: "25px", height: "25px" }}
          />
          <LazyLoadImage
            alt="galactic-tool"
            src="/tools/switch.png"
            style={{ width: "25px", height: "25px" }}
          />
          <LazyLoadImage
            alt="galactic-tool"
            src="/tools/disconnect.png"
            style={{ width: "25px", height: "25px" }}
          />
        </Center>
        <Progressive cRatio={cRatio} />
      </Flex>
      <Flex
        w="80%"
        mt="2rem"
        justify="space-between"
        position="relative"
        ref={ref}
      >
        {isComponentVisible && <DropDown handler={onSelectHandler} />}
        <Text color="#333333" fontWeight="bold" m="0">
          {t().staking.details}
        </Text>
        <LazyLoadImage
          src="/tools/Drop.png"
          alt=""
          style={{ width: "18px", height: "auto", cursor: "pointer" }}
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        />
      </Flex>
      <VStack w="80%" h="50%" spacing="0">
        {debt.map((item, index) => {
          return (
            <ResponsiveContainer
              key={index}
              w="100%"
              borderBottom="1px solid #FFFFFF"
              justify="center"
              direction="column"
            >
              <Flex justify="space-between" w="100%" mt="1rem">
                <Text m="0" color="#333333">
                  {item.title}
                </Text>
                <Text m="0" color="#333333" fontWeight="bold">
                  {item.value} {item.unit}
                </Text>
              </Flex>
            </ResponsiveContainer>
          );
        })}
      </VStack>
    </Flex>
  );
}
