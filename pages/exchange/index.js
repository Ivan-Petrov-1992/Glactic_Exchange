import { useState, useEffect, useRef, useContext } from "react";
import { OutLayer, Foundation } from "../index";
import Menu from "components/AppWrapper/Menu";
import {
  Flex,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import styled from "styled-components";
import { SearchIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import GAssetList from "components/Card/Exchange/GAssetList";
import axios from "axios";
import useSWR from "swr";
import Loading from "components/AppWrapper/Loading";
import { LocaleContext } from "context/localeContentext";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const Button = styled.button`
  width: 130px;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  color: #333333;
  border-radius: 12px;
  background-color: transparent;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 0;
  &:hover {
    background: #625ff5;
    color: #ffffff;
    transform: scale(1.02);
  }
  &:focus {
    background: #625ff5;
    color: #ffffff;
  }
`;

const selectStyle = {
  control: () => ({
    width: "160px",
    display: "flex",
    height: "max-content",
    color: "#999999",
    background: "rgba(255, 255, 255, 0.6)",
    border: "1px solid #E7E7E7",
    borderRadius: "12px",
    padding: "0",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
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

const AssetOptions = [
  { label: "All", value: "all" },
  { label: "Cryptocurrencies", value: "Crypto" },
  { label: "Equities", value: "Eq" },
  { label: "Commodities", value: "Commo" },
  { label: "Fiat Currencies", value: "Flat" },
  { label: "NFTs & Art", value: "N&A" },
];

export default function Exchange() {
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/instrument?option=recently",
    fetcher,
    { refreshInterval: 3000 }
  );

  const { data: response } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/instrument",
    fetcher,
    { refreshInterval: 3000 }
  );
  const [tab, setTab] = useState(true);
  const [selected, setSelected] = useState(null);
  const [assetData, setAssetData] = useState(null);
  const [search, setSearch] = useState(null);

  const input = useRef(null);

  const onChangeHandler = (e) => {
    if (e.label === "All") {
      setSelected(null);
    } else {
      setSelected(e);
    }
  };

  useEffect(() => {
    if (response && tab) {
      setAssetData(response.data);
    } else if (data && !tab) {
      setAssetData(data.data);
    }
  }, [response, data, tab]);
  if (!data || !response) {
    return <Loading />;
  }
  return (
    <OutLayer>
      <Foundation>
        <Menu />
        <Divider
          orientation="vertical"
          border="1"
          height="90%"
          m="3% 0 0 0"
          opacity="0.2"
        />
        <Flex
          w="calc(92vw - 250px)"
          h="100%"
          direction="column"
          align="center"
          overflowY="auto"
        >
          <Flex justify="space-between" w="95%" h="40px" mt="80px">
            <Flex h="100%" gridColumnGap="20px">
              <Button onClick={() => setTab(true)}>
                {t().exchange.current}
              </Button>
              <Button onClick={() => setTab(false)}>
                {t().exchange.recent}
              </Button>
            </Flex>
            <Flex h="100%">
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
                  ml="10px"
                  // eslint-disable-next-line react/no-children-prop
                  children={<SearchIcon h="50%" w={14} color="#666666" />}
                />
                <Input
                  type="tel"
                  w="110px"
                  fontSize="14px"
                  pl="25px"
                  bg="rgba(255, 255, 255, 0.6)"
                  outline="none"
                  border="1px solid #E7E7E7"
                  borderRadius="12px"
                  ref={input}
                  onChange={() => {
                    setSearch(input.current.value);
                  }}
                />
              </InputGroup>
            </Flex>
          </Flex>
          {tab ? (
            <GAssetList
              data={assetData}
              selected={selected}
              search={search}
              t={t}
            />
          ) : (
            <GAssetList
              data={assetData}
              selected={selected}
              search={search}
              t={t}
            />
          )}
        </Flex>
      </Foundation>
    </OutLayer>
  );
}
