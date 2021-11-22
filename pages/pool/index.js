import { useState, useContext } from "react";
import Tab from "components/Tab";
import Menu from "components/AppWrapper/Menu";
import { OutLayer, Foundation } from "../index";
import { Divider, Center, Flex } from "@chakra-ui/react";
import PoolDept from "components/Card/PoolDept";
import PoolWith from "components/Card/PoolWith";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocaleContext } from "context/localeContentext";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CardTypo from "components/Typography/CardTypo";
import axios from "axios";
import useSWR from "swr";
import Loading from "components/AppWrapper/Loading";

const PoolState = styled(Flex)`
  width: 280px;
  height: 125px;
  border-radius: 20px;
  box-shadow: 0px 1px 2px 0px rgba(220, 220, 220, 0.5);
  align-items: center;
  justify-content: center;
`;

export default function Pool() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/stable",
    fetcher,
    { refreshInterval: 1000 }
  );
  const [active, setActive] = useState({ left: true, right: false });
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  if (!data) return <Loading />;
  return (
    <OutLayer>
      <Foundation>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
        <Menu />
        <Divider
          orientation="vertical"
          border="1"
          height="90%"
          m="3% 0 0 0"
          opacity="0.2"
        />
        <Center h="100%" w="calc(92vw - 250px)" flexDirection="column">
          <Flex w="600px" justify="space-between">
            <PoolState bg="#FFD8D0">
              <LazyLoadImage
                alt="depo"
                src="/pool/pool_deposit.png"
                style={{ width: "40px", height: "40px" }}
              />
              <Flex direction="column" ml="2rem" gridRowGap="10px">
                <CardTypo color="#333333" size="1rem">
                  {t().stable.deposited}
                </CardTypo>
                <CardTypo color="#333333" size="18px" weight="600">
                  {Number(data.data.stable_balance)} gUSD
                </CardTypo>
              </Flex>
            </PoolState>
            <PoolState bg="#92C3FF">
              <LazyLoadImage
                alt="depo"
                src="/pool/pool_total.png"
                style={{ width: "40px", height: "40px" }}
              />
              <Flex direction="column" ml="2rem" gridRowGap="10px">
                <CardTypo color="#333333" size="1rem">
                  {t().stable.total}
                </CardTypo>
                <CardTypo color="#333333" size="18px" weight="600">
                  {Number(data.data.stablePool)} gUSD
                </CardTypo>
              </Flex>
            </PoolState>
          </Flex>
          <Flex
            width="540px"
            height="55px"
            bg="rgba(98, 95, 245, 0.2)"
            borderRadius="110px"
            mt="5.5rem"
          >
            <Tab
              titleA={t().stable.deposit}
              titleB={t().stable.withdraw}
              setActive={setActive}
              active={active}
              size="18px"
            />
          </Flex>
          {active.left && <PoolDept t={t} data={data} />}
          {active.right && <PoolWith t={t} data={data} />}
        </Center>
      </Foundation>
    </OutLayer>
  );
}
