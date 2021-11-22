import { useContext } from "react";
import { Panel } from "components/Panel";
import { Flex, Center, VStack } from "@chakra-ui/react";
import { OutLayer, Foundation } from "../index";
import { useRouter } from "next/router";
import Menu from "components/AppWrapper/Menu";
import RHome from "components/RHpanel/RHome";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CardTypo from "components/Typography/CardTypo";
import useSWR from "swr";
import axios from "axios";
import Loading from "components/AppWrapper/Loading";
import { LocaleContext } from "context/localeContentext";

const PanelSm = styled(Panel)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0;
  justify-content: center;
  row-gap: 30px;
  column-gap: 5%;
`;

const HomeBox = styled(Center)`
  height: 205px;
  width: 40%;
  border-radius: 30px;
  background-color: ${(props) => props.bg};
  position: relative;
`;

const InfoBox = styled.div`
  height: 230px;
  width: 40%;
  row-gap: 15px;
  align-items: center;
  display: flex;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  flex-direction: column;
`;

export default function Home() {
  const router = useRouter();
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/home",
    fetcher
  );
  if (!data) {
    return <Loading />;
  }
  return (
    <OutLayer>
      <Foundation>
        <Menu />
        <Flex w="calc(92vw - 250px)" h="100%">
          <PanelSm lg>
            <HomeBox bg="#5E51F2">
              <LazyLoadImage
                alt=""
                src="/home/Debt.png"
                style={{
                  width: "10%",
                  height: "auto",
                  position: "absolute",
                  right: "25px",
                  bottom: "15px",
                }}
              />
              <LazyLoadImage
                alt=""
                src="/home/conrner.png"
                style={{
                  width: "35%",
                  height: "auto",
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                }}
              />
              <VStack spacing="15px">
                <CardTypo color="#FFFFFF" size="16px">
                  {t().home.debt}
                </CardTypo>
                <CardTypo color="#FFFFFF" size="24px" weight="600">
                  {Number(data.data.personalDebt).toFixed(2)} gUSD
                </CardTypo>
              </VStack>
            </HomeBox>
            <HomeBox bg="#5E51F2">
              <LazyLoadImage
                alt=""
                src="/home/GalValue.png"
                style={{
                  width: "10%",
                  height: "auto",
                  position: "absolute",
                  right: "25px",
                  bottom: "15px",
                }}
              />
              <LazyLoadImage
                alt=""
                src="/home/conrner.png"
                style={{
                  width: "35%",
                  height: "auto",
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                }}
              />
              <VStack spacing="15px">
                <CardTypo color="#FFFFFF" size="16px">
                  {t().home.gal}
                </CardTypo>
                <CardTypo color="#FFFFFF" size="24px" weight="600">
                  {Number(data.data.gTotalBalance).toFixed(2)} gUSD
                </CardTypo>
              </VStack>
            </HomeBox>
            <InfoBox>
              <LazyLoadImage
                alt="galactic-mint"
                src="/home/Mint.png"
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  marginTop: "35px",
                }}
                onClick={() => {
                  router.push("/staking");
                }}
              />
              <CardTypo color="#333333" size="16px" weight="600">
                {t().home.mint}
              </CardTypo>
              <CardTypo color="#666666" size="14px" w="90%" align="center">
                {t().home.mint_descrition}
              </CardTypo>
            </InfoBox>
            <InfoBox>
              <LazyLoadImage
                alt="galactic-mint"
                src="/home/Trade.png"
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  marginTop: "35px",
                }}
                onClick={() => {
                  router.push("/exchange");
                }}
              />
              <CardTypo color="#333333" size="16px" weight="600">
                {t().home.trade}
              </CardTypo>
              <CardTypo color="#666666" size="14px" w="90%" align="center">
                {t().home.trade_descrition}
              </CardTypo>
            </InfoBox>
            <InfoBox>
              <LazyLoadImage
                alt="galactic-mint"
                src="/home/Pool.png"
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  marginTop: "35px",
                }}
                onClick={() => {
                  router.push("/pool");
                }}
              />
              <CardTypo color="#333333" size="16px" weight="600">
                {t().home.pool}
              </CardTypo>
              <CardTypo color="#666666" size="14px" w="90%" align="center">
                {t().home.pool_descrition}
              </CardTypo>
            </InfoBox>
            <InfoBox>
              <LazyLoadImage
                alt="galactic-mint"
                src="/home/Farm.png"
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  marginTop: "35px",
                }}
                onClick={() => {
                  router.push("/claim");
                }}
              />
              <CardTypo color="#333333" size="16px" weight="600">
                {t().home.farm}
              </CardTypo>
              <CardTypo color="#666666" size="14px" w="90%" align="center">
                {t().home.farm_descrition}
              </CardTypo>
            </InfoBox>
          </PanelSm>
          <RHome t={t} />
        </Flex>
      </Foundation>
    </OutLayer>
  );
}
