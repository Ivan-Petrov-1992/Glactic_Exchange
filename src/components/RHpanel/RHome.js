import React, { useState, useEffect } from "react";
import { Flex, VStack, Text, Center } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Progressive from "components/Progressive";
import useSWR from "swr";
import axios from "axios";
import Tab from "components/Tab";
import useComponentVisible from "hooks/useComponentVisible";
import DropDown from "components/TokenDropdown";
import styled from "styled-components";

const ResponsiveContainer = styled(Flex)`
  height: 25%;
  @media (min-width: 2000px) {
    height: 15%;
  }
`;
const ResponsiveContainerB = styled(Flex)`
  height: 20%;
  @media (min-width: 2000px) {
    height: 10%;
  }
`;

export default function RHome({ t }) {
  // eslint-disable-next-line no-unused-vars
  const [cRatio, setcRatio] = useState(null);
  const [active, setActive] = useState({ left: true, right: false });
  const [balance, setBalance] = useState([]);
  const [selected, setSelected] = useState("ETH");
  const [debtDetail, setDebtDtail] = useState([]);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const fetchWithId = (url, id) =>
    axios.get(`${url}?instrument_id=${id}`).then((res) => res.data);
  const { data: wallet } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/home",
    fetcher
  );
  const { data: debt } = useSWR(
    selected
      ? [process.env.NEXT_PUBLIC_API + "index/dex/borrowRight", selected]
      : null,
    fetchWithId
  );

  useEffect(() => {
    if (debt) {
      setDebtDtail([
        {
          title: t().rightBar.stake,
          value: Number(debt.data.pledgeNum).toFixed(2),
          unit: selected,
        },
        {
          title: t().rightBar.ratio,
          value: Number(debt.data.currentPledgeRatio).toFixed(2),
          unit: "%",
        },
        {
          title: t().rightBar.total,
          value: Number(debt.data.personalDebt).toFixed(2),
          unit: "USD",
        },
        {
          title: t().rightBar.deposited,
          value: Number(debt.data.depositParam).toFixed(2),
          unit: "gUSD",
        },
      ]);
    }
    if (wallet) {
      setcRatio(Number(wallet.data.ratio).toFixed(1));
      setBalance([
        {
          token: "Gala",
          icon: "/StakeIcon/GALAForm.png",
          currency: `$${Number(wallet.data.wallet[3].gala_mark_price).toFixed(
            2
          )}`,
          balance: Number(wallet.data.wallet[3].GALA).toFixed(2),
        },
        {
          token: "ETH",
          icon: "/StakeIcon/ETHForm.png",
          currency: `$${Number(wallet.data.wallet[1].eth_mark_price).toFixed(
            2
          )}`,
          balance: Number(wallet.data.wallet[1].ETH).toFixed(2),
        },
        {
          token: "BTC",
          icon: "/StakeIcon/BTCForm.png",
          currency: `$${Number(wallet.data.wallet[0].btc_mark_price).toFixed(
            2
          )}`,
          balance: Number(wallet.data.wallet[0].BTC).toFixed(2),
        },
        {
          token: "BNB",
          icon: "/StakeIcon/BNBForm.png",
          currency: `$${Number(wallet.data.wallet[2].bnb_mark_price).toFixed(
            2
          )}`,
          balance: Number(wallet.data.wallet[2].BNB).toFixed(2),
        },
      ]);
    }
  }, [wallet, debt, selected, t]);

  const onSelectHandler = (value) => {
    setIsComponentVisible(false);
    setSelected(value);
  };
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
          w="90%"
          mt="2rem"
          h="45px"
          border="2px solid #FFFFFF"
          bg="rgba(255, 255, 255, 0.4)"
          borderRadius="22px"
        >
          {wallet ? (
            <Text color="#333333" mr="2rem" m="0">
              {wallet.data.user_id}
            </Text>
          ) : (
            <Text color="#333333" mr="2rem" m="0">
              Loading...
            </Text>
          )}

          <Center
            bg="rgb(220,212,246)"
            borderRadius="15px"
            h="30px"
            w="40%"
            ml="1rem"
          >
            <Text color="#333333" m="0">
              Mainnet
            </Text>
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
        ref={ref}
        w="90%"
        justify="space-between"
        align="center"
        mt="2rem"
        h="30px"
        position="relative"
      >
        {isComponentVisible && <DropDown handler={onSelectHandler} />}
        <Flex
          w="190px"
          h="100%"
          bg="rgba(98, 95, 245, 0.2)"
          borderRadius="110px"
        >
          <Tab
            titleA={t().rightBar.balance}
            titleB={t().rightBar.Details}
            setActive={setActive}
            active={active}
            size="14px"
          />
        </Flex>
        <LazyLoadImage
          src="/tools/Drop.png"
          alt=""
          style={{ width: "18px", height: "auto", cursor: "pointer" }}
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        />
      </Flex>
      {active.left && (
        <VStack w="80%" h="50%" spacing="0">
          {balance.map((item, index) => {
            return (
              <ResponsiveContainer
                key={index}
                w="100%"
                borderBottom="1px solid #FFFFFF"
                justify="center"
                direction="column"
              >
                <Flex w="100%" justify="space-between">
                  <Flex align="center">
                    <LazyLoadImage
                      src={item.icon}
                      alt=""
                      style={{ width: "22px", height: "22px" }}
                    />
                    <Text m="0 0 0 .5rem" color="#333333" fontWeight="bold">
                      {item.token}
                    </Text>
                  </Flex>
                  <Text m="0" color="#333333">
                    {item.balance} {item.token}
                  </Text>
                </Flex>
                <Flex justify="space-between" w="100%" mt="1rem">
                  <Text m="0" color="#333333">
                    1{item.token} = {item.currency}
                  </Text>
                </Flex>
              </ResponsiveContainer>
            );
          })}
        </VStack>
      )}
      {selected && active.right && (
        <VStack w="80%" h="50%" spacing="10px">
          {debtDetail ? (
            debtDetail.map((item, index) => {
              return (
                <ResponsiveContainerB
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
                </ResponsiveContainerB>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </VStack>
      )}
    </Flex>
  );
}
