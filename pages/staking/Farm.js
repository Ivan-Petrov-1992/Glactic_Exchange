import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { OutLayer, Foundation } from "../index";
import Menu from "components/AppWrapper/Menu";
import { Panel } from "components/Panel";
import { HStack, VStack, Flex } from "@chakra-ui/react";
import Tab from "components/Tab";
import DeptCard from "components/Card/DeptCard";
import WithCard from "components/Card/WithCard";
import StakeStat from "components/Card/StakeStat";
import RFarm from "components/RHpanel/RFarm";
import { useSelector } from "react-redux";
import useSWR from "swr";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocaleContext } from "context/localeContentext";

export default function Staking() {
  const [stat, setStat] = useState({});
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const [dynamicStake, setDynamicStake] = useState(0);
  const [dynamicWith, setDynamicWith] = useState(0);
  const [dynamicBorrow, setDynamicBorrow] = useState(0);
  const [dynamicBack, setDynamicBack] = useState(0);
  const router = useRouter();
  const { token } = router.query;
  const fetchWithId = (url, id) =>
    axios.get(`${url}?instrument_id=${id}`).then((res) => res.data);
  const { data } = useSWR(
    token ? [process.env.NEXT_PUBLIC_API + "/index/dex/borrow", token] : null,
    fetchWithId,
    { refreshInterval: 1000 }
  );
  const [price, setPrice] = useState(0);
  const ETHPrice = useSelector((state) => state.sys.eth_price);
  const BTCPrice = useSelector((state) => state.sys.btc_price);
  const BNBPrice = useSelector((state) => state.sys.bnb_price);
  const GALAPrice = useSelector((state) => state.sys.gala_price);
  const [active, setActive] = useState({ left: true, right: false });
  useEffect(() => {
    setDynamicBack(0);
    setDynamicBorrow(0);
    setDynamicStake(0);
    setDynamicWith(0);
    if (data) {
      setStat(data.data);
    }
    if (token === "ETH") {
      setPrice(ETHPrice);
    } else if (token === "BTC") {
      setPrice(BTCPrice);
    } else if (token === "GALA") {
      setPrice(GALAPrice);
    } else {
      setPrice(BNBPrice);
    }
  }, [ETHPrice, BTCPrice, GALAPrice, BNBPrice, token, data]);
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
        <Flex w="calc(92vw - 250px)" h="100%">
          <Panel lg>
            <HStack
              width="100%"
              mt="3rem"
              justifyContent="center"
              spacing="1vw"
            >
              <StakeStat
                key="stat-1"
                icon="/StakeIcon/stat1.svg"
                title={`${token} ${t().stake.price}`}
                value={price}
                unit="$"
              />
              <StakeStat
                key="stat-2"
                icon="/StakeIcon/stat2.svg"
                title={t().stake.ratio}
                value={stat.initial_ratio}
                suffix="%"
              />
              <StakeStat
                key="stat-3"
                icon="/StakeIcon/stat3.svg"
                title={t().stake.locked}
                value={stat.locked}
              />
            </HStack>
            <VStack width="100%" justify="center" spacing="3rem" mt="3rem">
              <Flex
                width="540px"
                height="3vw"
                bg="rgba(98, 95, 245, 0.2)"
                borderRadius="110px"
              >
                <Tab
                  titleA={t().staking.deposit}
                  titleB={t().staking.withdraw}
                  setActive={setActive}
                  active={active}
                  setDynamicStake={setDynamicStake}
                  setDynamicBorrow={setDynamicBorrow}
                  setDynamicWith={setDynamicWith}
                  setDynamicBack={setDynamicBack}
                  size="20px"
                />
              </Flex>
              {active.left && (
                <DeptCard
                  token={token}
                  setDynamicStake={setDynamicStake}
                  setDynamicBorrow={setDynamicBorrow}
                  t={t}
                />
              )}
              {active.right && (
                <WithCard
                  token={token}
                  setDynamicWith={setDynamicWith}
                  setDynamicBack={setDynamicBack}
                  t={t}
                />
              )}
            </VStack>
          </Panel>
          <RFarm
            token={token}
            dynamicStake={dynamicStake}
            dynamicWith={dynamicWith}
            dynamicBorrow={dynamicBorrow}
            dynamicBack={dynamicBack}
            price={price}
            t={t}
          />
        </Flex>
      </Foundation>
    </OutLayer>
  );
}
