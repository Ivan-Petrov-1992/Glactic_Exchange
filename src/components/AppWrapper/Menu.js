import { useContext, useState } from "react";
import styled from "styled-components";
import { SidebarData } from "constants/data";
import Link from "next/link";
import { Divider, Flex } from "@chakra-ui/react";
import CardTypo from "components/Typography/CardTypo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSWR from "swr";
import axios from "axios";
import { LocaleContext } from "context/localeContentext";
import {
  setGalaPrice,
  setEthPrice,
  setBNBPrice,
  setBTCPrice,
} from "store/reducer/systemSlice";
import useInterval from "hooks/useInterval";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const GalaPriceLine = dynamic(() => import("../Chart/Home/priceLine"), {
  ssr: false,
});

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  div:nth-child(2) {
    margin-top: 2rem;
  }
`;

export const Logo = styled.img`
  width: 145px;
  height: auto;
  margin: 35px 0 0 30px;
`;

const Img = styled.div`
  width: 1.2rem;
  background: url(${(props) => props.bg});
  background-size: cover;
  height: 1.2rem;
`;

const LocaleItem = styled.button`
  background-color: transparent;
  border-radius: 12px;
  border: 0;
  cursor: pointer;
  outline: none;
  height: 50%;
  width: 100%;
  &:hover {
    color: #ffffff;
    background-color: #625ff5;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  background: none;
  cursor: pointer;
  width: 80%;
  column-gap: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  height: 3rem;
  border: 0;
  font-size: 1rem;
  border-radius: 16px;
  color: #666666;
  font-weight: 600;
  text-align: left;
  transition: transform 0.2s ease-in-out;
  &.active-link {
    color: #ffff;
    background: #625ff5;
    .menu-icon {
      background: url(${(props) => props.bgHover});
      background-size: cover;
    }
  }
  &:hover {
    color: #ffff;
    background: #625ff5;
    .menu-icon {
      background: url(${(props) => props.bgHover});
      background-size: cover;
    }
  }
  &:active {
    transform: scale(1.02);
  }
`;

export default function Menu() {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const {
    dispatch: { setLocale, t },
  } = useContext(LocaleContext);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const dispatch = useDispatch();
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/price",
    fetcher,
    { refreshInterval: 3000 }
  );
  const { data: gUSD } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/home",
    fetcher,
    { refreshInterval: 3000 }
  );
  useInterval(() => {
    if (gUSD) {
      dispatch(setGalaPrice(Number(gUSD.data.wallet[3].gala_mark_price)));
      dispatch(setEthPrice(Number(gUSD.data.wallet[1].eth_mark_price)));
      dispatch(setBTCPrice(Number(gUSD.data.wallet[0].btc_mark_price)));
      dispatch(setBNBPrice(Number(gUSD.data.wallet[2].bnb_mark_price)));
    }
  }, 2000);

  return (
    <MenuContainer>
      <Logo alt="galactic_logo" src="/logo/logo.png" />
      {SidebarData.map((item, index) => (
        <Link href={item.path} key={index}>
          <Item
            bgHover={item.iconHover}
            className={router.pathname == item.path ? `active-link` : null}
          >
            <Img bg={item.icon} className="menu-icon" />
            {t().menu[item.name]}
          </Item>
        </Link>
      ))}
      <Divider orientation="horizontal" width="80%" border="1" opacity="0.5" />
      <Flex direction="column" gridRowGap="20px" m="2rem 0 0 2rem">
        <Flex w="100%">
          <Flex direction="column" gridRowGap="20px" w="40%">
            <CardTypo color="#666666" size="1rem">
              {t().menu.price}
            </CardTypo>
            {data ? (
              <CardTypo color="#333333" size="1rem" weight="600">
                ${Number(data.data.mark_price).toFixed(2)}
              </CardTypo>
            ) : null}
          </Flex>
          <Flex w="60%" h="60px" mt="0 !important">
            <GalaPriceLine />
          </Flex>
        </Flex>

        <CardTypo color="#666666" size="1rem">
          {t().menu.balance}
        </CardTypo>
        {data ? (
          <CardTypo color="#333333" size="1rem" weight="600">
            {Number(data.data.balance).toFixed(2)}
          </CardTypo>
        ) : null}
        <CardTypo color="#666666" size="1rem">
          {t().menu.gUsd}
        </CardTypo>
        {gUSD ? (
          <CardTypo color="#333333" size="1rem" weight="600">
            {Number(gUSD.data.gUSD_balance)}
          </CardTypo>
        ) : null}
      </Flex>
      <Flex w="90%" justify="flex-end" mt="1rem" position="relative">
        {hover && (
          <Flex
            w="50%"
            h="80px"
            position="absolute"
            bg="#ffffff"
            bottom="25px"
            borderRadius="12px"
            direction="column"
            align="center"
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <LocaleItem
              onClick={() => {
                setLocale("en");
                setHover(false);
              }}
            >
              En-Us
            </LocaleItem>
            <LocaleItem
              onClick={() => {
                setLocale("zh");
                setHover(false);
              }}
            >
              简体中文
            </LocaleItem>
          </Flex>
        )}
        <LazyLoadImage
          alt="locales"
          src="/tools/EN.png"
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
          onMouseEnter={() => {
            setHover(true);
          }}
        />
      </Flex>
    </MenuContainer>
  );
}
