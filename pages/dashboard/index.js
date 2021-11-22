import { useContext } from "react";
import { OutLayer, Foundation } from "../index";
import { Panel } from "components/Panel";
import Menu from "components/AppWrapper/Menu";
import SysStat from "components/Card/Dashboard/SysStat";
import { HStack, Flex } from "@chakra-ui/react";
import styled from "styled-components";
import Exchange from "components/Card/Dashboard/Exchange";
import Network from "components/Card/Dashboard/Network";
import CollPool from "components/Card/Dashboard/CollPool";
import axios from "axios";
import useSWR from "swr";
import Loading from "components/AppWrapper/Loading";
import { LocaleContext } from "context/localeContentext";

const Stack = styled(HStack)`
  width: 100%;
  margin: 5rem 0 0 0;
  justify-content: center;
`;

export default function Dashboard() {
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/total",
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data: trade } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/totalTrades",
    fetcher,
    { refreshInterval: 5000 }
  );

  const { data: pie } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/tradeProportion",
    fetcher,
    { refreshInterval: 1000 }
  );
  const fetchGala = (url) =>
    axios.get(`${url}?keyword=gGALA`).then((res) => res.data);
  const { data: gala } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/instrument",
    fetchGala
  );
  if (!data || !pie || !trade || !gala) {
    return <Loading />;
  }
  return (
    <OutLayer>
      <Foundation>
        <Menu />
        <Flex w="calc(92vw - 250px)" h="100%">
          <Panel>
            <Stack spacing="3%">
              <SysStat
                title={t().dashboard.Dpool}
                subTitleA={t().dashboard.totalA}
                subTitleB={t().dashboard.share}
                subTitleC={t().dashboard.apy}
                valueA={Number(data.data.debt.totalAmount.toFixed(2))}
                valueB={Number(data.data.debt.personalDebt.toFixed(2))}
                valueC={`${data.data.debt.debtAPY}%`}
                gardient="linear-gradient(311deg, #FE9370 1%, #FF72B2 100%)"
              />
              <SysStat
                title={t().dashboard.Spool}
                subTitleA={t().dashboard.totalA}
                subTitleB={t().dashboard.share}
                subTitleC={t().dashboard.apy}
                valueA={data.data.stability.totalAmount}
                valueB={data.data.stability.stable}
                valueC={`${Number(data.data.stability.stableAPY.toFixed(2))}%`}
                gardient="linear-gradient(310deg, #755AF6 0%, #C639FF 100%, #715AF6 100%)"
              />
              <SysStat
                title={t().dashboard.claim}
                subTitleA={t().dashboard.stake}
                subTitleB={t().dashboard.exchange}
                subTitleC={t().dashboard.pool}
                valueA={`${data.data.claim.stake} GALA`}
                valueB={`${data.data.claim.exchange} GALA`}
                valueC={`${data.data.claim.stability} GALA`}
                gardient="linear-gradient(135deg, #DE99A2 0%, #7D5BC4 100%)"
              />
            </Stack>
            <Exchange pie={pie.data} trade={trade.data} t={t} />
            <CollPool data={data.data.pledge} t={t} />
            <Network t={t} data={gala.data} />
          </Panel>
        </Flex>
      </Foundation>
    </OutLayer>
  );
}
