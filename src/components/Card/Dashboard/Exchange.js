import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Flex,
  VStack,
  Center,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CardTypo from "components/Typography/CardTypo";
import axios from "axios";
import useSWR from "swr";
import RingLoader from "react-spinners/RingLoader";

const CustomLargeTool = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.bg};
`;

const ImgHolder = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    height: 25px;
  }
`;

const Change = styled.div`
  height: 40px;
  min-width: 80px;
  border-radius: 10px;
  font-size: 1rem;
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: 1px solid ${(props) => props.color};
`;

const Button = styled.button`
  outline: none;
  width: 140px;
  font-size: 18px;
  color: #ffffff;
  border-radius: 12px;
  background: #625ff5;
  cursor: pointer;
  border: 0;
  transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 5px 5px 20px 6px rgba(226, 226, 226, 0.5);
  &:hover {
    transform: scale(1.02);
  }
`;

const IntSwitch = styled.button`
  border: 0;
  outline: none;
  background-color: transparent;
  color: #666666;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    color: #625ff5;
    font-weight: bold;
  }
`;

const ExBar = dynamic(() => import("../../Chart/DashBoard/ExBar"), {
  ssr: false,
});

const GassetPie = dynamic(() => import("../../Chart/DashBoard/GassetPie"), {
  ssr: false,
});

export default function Exchange({ pie, trade, t }) {
  const inputRef = useRef(null);
  const [search, setSearch] = useState(null);
  const [interval, setInterval] = useState("M");
  const fetchWithInt = (url, interval) =>
    axios.get(`${url}?resolution=${interval}`);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: list } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/instrument",
    fetcher,
    { refreshInterval: 2000 }
  );
  const { data: bar } = useSWR(
    [process.env.NEXT_PUBLIC_API + "/index/dex/totalExchange", interval],
    fetchWithInt,
    { refreshInterval: 1000 }
  );
  const [totalTrade, setTotalTrade] = useState(0);
  const [barData, setBarData] = useState([
    {
      name: t().dashboard.cry,
      amout: 0,
    },
    {
      name: t().dashboard.eq,
      amout: 0,
    },
    {
      name: t().dashboard.co,
      amout: 0,
    },
    {
      name: t().dashboard.fc,
      amout: 0,
    },
    {
      name: t().dashboard.nft,
      amout: 0,
    },
  ]);
  const [pieData, setPieData] = useState([
    { name: "gGALA", value: 0 },
    { name: "gBTC", value: 0 },
    { name: "gETH", value: 0 },
    { name: "gBNB", value: 0 },
    { neme: "others", value: 0 },
  ]);
  useEffect(() => {
    if (bar) {
      setTotalTrade(Number(bar.data.data.totalTradeVolume.toFixed(2)));
      setBarData([
        {
          name: t().dashboard.cry,
          amout: bar.data.data.categories.Cryptocurrencies,
        },
        {
          name: t().dashboard.eq,
          amout: bar.data.data.categories.Equities,
        },
        {
          name: t().dashboard.co,
          amout: bar.data.data.categories.Commodities,
        },
        {
          name: t().dashboard.fc,
          amout: bar.data.data.categories.FiatCurrencies,
        },
      ]);
    }
    if (pie) {
      setPieData([
        { name: "gGALA", value: pie.gGALA },
        { name: "gBTC", value: pie.gBTC },
        { name: "gETH", value: pie.gETH },
        { name: "gBNB", value: pie.gBNB },
        { neme: "others", value: pie.Others },
      ]);
    }
  }, [bar, pie, t]);
  const searchHandler = (e) => {
    e.preventDefault();
    const isMatch = list.data.find(({ instrument_name }) => {
      return instrument_name
        .toLowerCase()
        .includes(inputRef.current.value.toLowerCase());
    });
    if (isMatch) {
      setSearch(inputRef.current.value);
    }
    inputRef.current.value = "";
  };
  return (
    <Flex direction="column" w="95%" ml="4%" mt="1rem">
      <Text color="#333333" fontSize="18px" fontWeight="bold">
        {t().dashboard.ex}
      </Text>
      <Flex w="96%" h="418px" justify="space-between">
        <Flex
          w="60%"
          h="100%"
          bg="rgba(255, 255, 255, 0.6)"
          border="2px solid white"
          borderRadius="30px"
          direction="column"
          align="center"
        >
          <Flex w="90%" justify="flex-start">
            <CardTypo
              color="##333333"
              size="16px"
              weight="bold"
              style={{ margin: "30px 0 0 0" }}
            >
              {t().dashboard.performance}
            </CardTypo>
          </Flex>
          <Flex
            w="90%"
            justify="space-between"
            mt="1rem"
            h="40px"
            align="center"
            borderBottom="1px solid #E7E7E7"
          >
            <CardTypo color="#666666" size="14px" w="25%" align="left">
              {t().dashboard.token}
            </CardTypo>
            <CardTypo color="#666666" size="14px" w="25%" align="center">
              {t().dashboard.p}
            </CardTypo>
            <CardTypo color="#666666" size="14px" w="25%" align="center">
              {t().dashboard.volume}
            </CardTypo>
            <CardTypo color="#666666" size="14px" w="25%" align="right">
              {t().dashboard.change}
            </CardTypo>
          </Flex>
          <Flex
            w="100%"
            mt="2rem"
            direction="column"
            gridRowGap="30px"
            overflowY="auto"
            align="center"
            h="200px"
          >
            {list ? (
              list.data
                .filter((item) => {
                  if (!search) {
                    return item;
                  } else if (
                    item.instrument_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      w="90%"
                      justify="space-between"
                      align="center"
                    >
                      <ImgHolder>
                        <LazyLoadImage
                          alt=""
                          effect="blur"
                          src={`/tokens/${item.instrument_name.slice(
                            0,
                            -5
                          )}.png`}
                          style={{
                            width: "25px",
                            height: "100%",
                            marginRight: "10px",
                          }}
                        />
                        <CardTypo color="#333333" align="left">
                          {item.instrument_name.slice(0, -5)}
                        </CardTypo>
                      </ImgHolder>

                      <CardTypo color="#333333" w="25%" align="center">
                        ${Number(item.mark_price)}
                      </CardTypo>
                      <CardTypo color="#333333" w="25%" align="center">
                        {Number(item.volume_24h)}
                      </CardTypo>
                      <Flex w="25%" justify="flex-end">
                        {item.mark_price - item.open_24h > 0 ? (
                          <Change color="#0DAD92">
                            {(
                              (item.mark_price - item.open_24h) /
                              item.open_24h
                            ).toFixed(2)}
                            %
                          </Change>
                        ) : (
                          <Change color="#F7517F">
                            {(
                              (item.mark_price - item.open_24h) /
                              item.open_24h
                            ).toFixed(2)}
                            %
                          </Change>
                        )}
                      </Flex>
                    </Flex>
                  );
                })
            ) : (
              <p>loading...</p>
            )}
          </Flex>
          <Flex w="90%" h="40px" mt="1rem" justify="space-between">
            <InputGroup w="60%">
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                ml="20px"
                // eslint-disable-next-line react/no-children-prop
                children={<SearchIcon h="50%" w={21} color="#B1B9C1" />}
              />
              <Input
                ref={inputRef}
                type="tel"
                h="40px"
                w="100%"
                fontSize="14px"
                pl="50px"
                placeholder={t().dashboard.pholder}
                bg="rgba(255, 255, 255, 0.6)"
                outline="none"
                border="1px solid #E7E7E7"
                borderRadius="14px"
              />
            </InputGroup>
            <Button onClick={searchHandler}>{t().dashboard.search}</Button>
          </Flex>
        </Flex>
        <Flex
          w="37%"
          h="100%"
          bg="rgba(255, 255, 255, 0.6)"
          border="2px solid white"
          borderRadius="30px"
          direction="column"
        >
          <Flex w="100%" h="50%" justify="center" align="center">
            <GassetPie data={pieData} />
          </Flex>

          <Flex w="100%" wrap="wrap" gridRowGap="20PX">
            <Center w="50%">
              <CustomLargeTool bg="#35277E" />
              <VStack ml="1.5rem" w="20%">
                <Text m="0" fontWeight="bold">
                  {Number((pie.gGALA * 100).toFixed(2))}%
                </Text>
                <Text>gGALA</Text>
              </VStack>
            </Center>
            <Center w="50%">
              <CustomLargeTool bg="#625FF5" />
              <VStack ml="1.5rem" w="20%">
                <Text m="0" fontWeight="bold">
                  {Number((pie.gBTC * 100).toFixed(2))}%
                </Text>
                <Text>gBTC</Text>
              </VStack>
            </Center>
            <Center w="50%">
              <CustomLargeTool bg="#FF9E00" />
              <VStack ml="1.5rem" w="20%">
                <Text m="0" fontWeight="bold">
                  {Number((pie.gETH * 100).toFixed(2))}%
                </Text>
                <Text>gETH</Text>
              </VStack>
            </Center>
            <Center w="50%">
              <CustomLargeTool bg="#68BEFC" />
              <VStack ml="1.5rem" w="20%">
                <Text m="0" fontWeight="bold">
                  {Number((pie.gBNB * 100).toFixed(2))}%
                </Text>

                <Text>gBNB</Text>
              </VStack>
            </Center>
            <Center w="50%">
              <CustomLargeTool bg="#FC7666" />
              <VStack ml="1.5rem" w="20%">
                <Text m="0" fontWeight="bold">
                  {Number((pie.Others * 100).toFixed(2))}%
                </Text>
                <Text>others</Text>
              </VStack>
            </Center>
          </Flex>
        </Flex>
      </Flex>
      {bar ? (
        <Flex
          w="96%"
          h="420px"
          bg="rgba(255, 255, 255, 0.4)"
          borderRadius="30px"
          border="2px solid #FFFFFF"
          direction="column"
          mt="2rem"
        >
          <Flex w="100%" h="30%" align="center" justify="space-between">
            <VStack w="max-content" align="left" ml="26px" spacing="25px">
              <Text m="0" fontSize="20px" fontWeight="bold" color="#333333">
                {t().dashboard.catergorie}
              </Text>
              <Flex>
                <Text m="0" color="#666666" fontSize="16px">
                  {t().dashboard.total}
                </Text>
                <Text
                  m="0"
                  ml="2rem"
                  fontSize="16px"
                  fontWeight="bold"
                  color="#333333"
                >
                  ${totalTrade}
                </Text>
              </Flex>
            </VStack>
            <Flex mr="50px" gridColumnGap="25px">
              <IntSwitch onClick={() => setInterval("D")}>D</IntSwitch>
              <IntSwitch onClick={() => setInterval("W")}>W</IntSwitch>
              <IntSwitch onClick={() => setInterval("M")}>M</IntSwitch>
            </Flex>
          </Flex>
          <ExBar data={barData} />
        </Flex>
      ) : (
        <Flex
          w="96%"
          h="420px"
          bg="rgba(255, 255, 255, 0.4)"
          borderRadius="30px"
          border="2px solid #FFFFFF"
          align="center"
          justify="center"
        >
          <RingLoader color="#625FF5" loading={true} size={50} />
        </Flex>
      )}

      <Flex w="96%" h="201px" m="2rem 0 0 0" justify="space-between">
        <Flex
          w="49%"
          h="100%"
          bg="rgba(255, 255, 255, 0.6)"
          border="2px solid white"
          borderRadius="30px"
          align="center"
        >
          <Center
            h="100%"
            w="20%"
            bg=" rgba(230, 225, 255, 0.5)"
            borderRight="2px solid white"
          >
            <LazyLoadImage
              alt=""
              src="/dashboard/Change.png"
              style={{ width: "50px", height: "auto" }}
              effect="blur"
            />
          </Center>
          <Flex w="max-content" align="left" ml="15%" direction="column">
            <Text m="0" fontSize="20px" fontWeight="bold">
              $ {Number(trade.TotalTradingVolume.toFixed(2))}
            </Text>
            <Text m=".5rem 0 0 0" fontSize="1rem">
              {t().dashboard.tv}
            </Text>
            <Text m="1.5rem 0 0 0" fontSize="20px" fontWeight="bold">
              {trade.DebtPoolChange}%
            </Text>
            <Text m=".5rem 0 0 0" fontSize="1rem">
              {t().dashboard.dc}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w="49%"
          h="100%"
          bg="rgba(255, 255, 255, 0.6)"
          border="2px solid white"
          borderRadius="30px"
          align="center"
        >
          <Center
            h="100%"
            w="20%"
            bg="rgba(250, 235, 232, 0.5)"
            borderRight="2px solid white"
          >
            <LazyLoadImage
              alt=""
              src="/dashboard/Staker.png"
              style={{ width: "50px", height: "auto" }}
              effect="blur"
            />
          </Center>
          <Flex w="max-content" align="left" ml="15%" direction="column">
            <Text m="0" fontSize="20px" fontWeight="bold">
              {trade.TotalTrades}
            </Text>
            <Text m=".5rem 0 0 0" fontSize="1rem">
              {t().dashboard.tt}
            </Text>
            <Text m="1.5rem 0 0 0" fontSize="20px" fontWeight="bold">
              {trade.ActiveTraders}
            </Text>
            <Text m=".5rem 0 0 0" fontSize="1rem">
              {t().dashboard.at}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
