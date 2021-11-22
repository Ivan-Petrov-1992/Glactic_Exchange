import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { SearchIcon } from "@chakra-ui/icons";
import CardTypo from "components/Typography/CardTypo";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Logo } from "./Menu";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #22222b;
`;

const ExLogo = styled(Logo)`
  cursor: pointer;
`;

const Button = styled.button`
  outline: none;
  border: 0;
  background-color: #2e2e38;
  border-radius: 12px;
  height: 40px;
  font-size: 1rem;
  color: #d0d0d0;
  cursor: pointer;
  &:focus {
    color: #9d9bff;
  }
`;

const AssetOptions = [
  { label: "All", value: "all" },
  { label: "Cryptocurrencies", value: "Crypto" },
  { label: "Equities", value: "Eq" },
  { label: "Commodities", value: "Commo" },
  { label: "Flat currencies", value: "Flat" },
  { label: "NFTs & Art", value: "N&A" },
];

const selectStyle = {
  control: () => ({
    width: "160px",
    display: "flex",
    height: "max-content",
    color: "#999999",
    background: "transparent",
    border: "1px solid #666666",
    borderRadius: "8px",
    padding: "0",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: "5px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  valueContainer: (provided) => ({ ...provided, height: "100%" }),
  singleValue: (provided) => {
    const color = "#999999";
    return { ...provided, color };
  },
  menu: (provided) => ({ ...provided, width: "230px" }),
  option: (provided) => ({
    ...provided,
    padding: 10,
    color: "#333333",
    background: "none",
    "&:hover": {
      color: "white",
      background: "#625FF5",
    },
  }),
};

export default function ExMenu({ t }) {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(null);
  const input = useRef(null);
  const [tab, setTab] = useState(true);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: list } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/instrument",
    fetcher,
    { refreshInterval: 2000 }
  );

  const { data: recent } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/instrument?option=recently",
    fetcher,
    { refreshInterval: 3000 }
  );
  useEffect(() => {});
  const onChangeHandler = (e) => {
    if (e.label === "All") {
      setSelected(null);
    } else {
      setSelected(e);
    }
  };
  return (
    <MenuContainer>
      <ExLogo
        alt="galactic_logo"
        src="/logo/logo.png"
        onClick={() => {
          router.push("/");
        }}
      />
      <Flex w="80%" mt="5rem" justify="space-between" ml="10%">
        <Button onClick={() => setTab(true)}>{t().exchange.current}</Button>
        <Button onClick={() => setTab(false)}>{t().exchange.recent}</Button>
      </Flex>
      <Flex w="95%" mt="1rem" ml="1rem">
        <Select
          options={AssetOptions}
          styles={selectStyle}
          isSearchable={false}
          onChange={onChangeHandler}
        />
        <InputGroup ml="10px">
          <InputLeftElement
            pointerEvents="none"
            h="100%"
            ml="5px"
            // eslint-disable-next-line react/no-children-prop
            children={<SearchIcon h="50%" w={14} color="#999999" />}
          />
          <Input
            type="tel"
            w="100px"
            fontSize="14px"
            color="#ffffff"
            pl="20px"
            bg="transparent"
            outline="none"
            border="1px solid #666666"
            borderRadius="8px"
            ref={input}
            onChange={() => {
              setSearch(input.current.value);
            }}
          />
        </InputGroup>
      </Flex>
      <Flex w="100%" mt="1rem" pl="2rem">
        <CardTypo color="#AAAAAA" w="33%" align="left">
          {t().exchange.pair}
        </CardTypo>
        <CardTypo color="#AAAAAA" w="33%" align="left">
          {t().exchange.price}
        </CardTypo>
        <CardTypo color="#AAAAAA" w="33%" align="left">
          {t().exchange.change}
        </CardTypo>
      </Flex>
      <Flex w="100%" direction="column" pl="1.5rem">
        {tab
          ? list
            ? list.data
                .filter((item) => {
                  if (!selected && !search) {
                    return item;
                  } else if (
                    selected &&
                    !search &&
                    item.type
                      .toLowerCase()
                      .includes(selected.label.toLowerCase())
                  ) {
                    return item;
                  } else if (
                    search &&
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
                      w="100%"
                      h="40px"
                      align="center"
                      transition="transform .2s ease-in-out"
                      borderRadius="12px"
                      cursor="pointer"
                      _hover={{
                        backgroundColor: "#D9D9FF",
                        transform: "scale(1.02)",
                      }}
                    >
                      <Flex w="33%" align="center">
                        <LazyLoadImage
                          alt=""
                          src={`/tokens/${item.instrument_name.slice(
                            0,
                            -5
                          )}.png`}
                          style={{
                            width: "15px",
                            height: "auto",
                            marginRight: "5px",
                          }}
                        />
                        <CardTypo
                          color="#FFFFFF"
                          align="left"
                          onClick={() =>
                            router.push(`?asset=${item.instrument_name}`)
                          }
                        >
                          {item.instrument_name.slice(0, -5)}
                        </CardTypo>
                      </Flex>

                      <CardTypo color="#FFFFFF" w="33%" align="left">
                        {Number(item.mark_price)}
                      </CardTypo>
                      {item.mark_price - item.open_24h > 0 ? (
                        <CardTypo color="#0DAD92" w="33%" align="left">
                          {(
                            (item.mark_price - item.open_24h) /
                            item.open_24h
                          ).toFixed(2)}
                        </CardTypo>
                      ) : (
                        <CardTypo color="#F94C4C" w="33%" align="left">
                          {(
                            (item.mark_price - item.open_24h) /
                            item.open_24h
                          ).toFixed(2)}
                        </CardTypo>
                      )}
                    </Flex>
                  );
                })
            : null
          : recent
          ? recent.data
              .filter((item) => {
                if (!selected && !search) {
                  return item;
                } else if (
                  selected &&
                  !search &&
                  item.type.toLowerCase().includes(selected.label.toLowerCase())
                ) {
                  return item;
                } else if (
                  search &&
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
                    w="100%"
                    h="40px"
                    align="center"
                    _hover={{ backgroundColor: "#D9D9FF" }}
                  >
                    <Flex w="33%" align="center">
                      <LazyLoadImage
                        alt=""
                        src={`/tokens/${item.instrument_name.slice(0, -5)}.png`}
                        style={{
                          width: "15px",
                          height: "auto",
                          marginRight: "5px",
                        }}
                      />
                      <CardTypo
                        color="#FFFFFF"
                        align="left"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(`?asset=${item.instrument_name}`)
                        }
                      >
                        {item.instrument_name.slice(0, -5)}
                      </CardTypo>
                    </Flex>

                    <CardTypo color="#FFFFFF" w="33%" align="left">
                      {Number(item.mark_price)}
                    </CardTypo>
                    {item.mark_price - item.open_24h > 0 ? (
                      <CardTypo color="#0DAD92" w="33%" align="left">
                        {(
                          (item.mark_price - item.open_24h) /
                          item.open_24h
                        ).toFixed(2)}
                      </CardTypo>
                    ) : (
                      <CardTypo color="#F94C4C" w="33%" align="left">
                        {(
                          (item.mark_price - item.open_24h) /
                          item.open_24h
                        ).toFixed(2)}
                      </CardTypo>
                    )}
                  </Flex>
                );
              })
          : null}
      </Flex>
    </MenuContainer>
  );
}
