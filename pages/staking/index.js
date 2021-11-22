import { useContext } from "react";
import { OutLayer, Foundation } from "../index";
import { useRouter } from "next/router";
import { Divider, Flex, HStack, Text, VStack, Button } from "@chakra-ui/react";
import Menu from "components/AppWrapper/Menu";
import TokenBanner from "components/Card/TokenBanner";
import { StakeData } from "constants/data";
import { LightText } from "components/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import CardTypo from "components/Typography/CardTypo";
import useSWR from "swr";
import axios from "axios";
import Loading from "components/AppWrapper/Loading";
import { LocaleContext } from "context/localeContentext";
import RHome from "components/RHpanel/RHome";

export default function Staking() {
  const fetchWithId = (url) => axios.get(url).then((res) => res.data);
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/stakeList",
    fetchWithId
  );
  const router = useRouter();
  if (!data) {
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
          w="calc(92vw - 250px - 280px)"
          h="100%"
          direction="column"
          overflowX="hidden"
          overflowY="auto"
        >
          <HStack w="95%" h="150px" bg="" ml="2.5%" mt="7rem" spacing="5%">
            <TokenBanner
              t={t}
              bg="#C7BAFF"
              title="Gala"
              sFee="0.3%"
              icon="/StakeIcon/GalaLogo.png"
              bgImg="/StakeIcon/Gala.png"
            />
            <TokenBanner
              t={t}
              bg="#FFD8D0"
              title="ETH"
              sFee="0.3%"
              icon="/StakeIcon/gETHLogo.png"
              bgImg="/StakeIcon/ETH.png"
            />
            <TokenBanner
              t={t}
              bg="#92C3FF"
              title="BTC"
              sFee="0.3%"
              icon="/StakeIcon/gBTClogo.png"
              bgImg="/StakeIcon/BTC.png"
            />
          </HStack>
          <Flex
            w="95%"
            h="56px"
            bg="rgba(98, 95, 245, 0.2)"
            ml="2.5%"
            mt="3.5rem"
            align="center"
          >
            {StakeData.map((item, index) => {
              return (
                <Text
                  key={index}
                  w="20%"
                  textAlign="center"
                  color="#333333"
                  fontWeight="600"
                  fontSize="16px"
                >
                  {t().stake[item]}
                </Text>
              );
            })}
          </Flex>
          <VStack
            w="95%"
            ml="2.5%"
            spacing="1rem"
            mt="2rem"
            h="300px"
            mb="2rem"
          >
            {data.data.map((item, index) => {
              return (
                <Flex
                  key={index}
                  w="100%"
                  h="60px"
                  bg="rgba(255, 255, 255, 0.7)"
                  borderRadius="12px"
                  border="3px solid #ffffff"
                  boxShadow=" 0px 2px 4px 0px rgba(213, 213, 213, 0.5)"
                  transition="transform .2s ease-in-out"
                  cursor="pointer"
                  _hover={{ transform: `scale(1.02)` }}
                  onClick={() => router.push(`Farm?token=${item.instrument}`)}
                >
                  <Flex
                    w="20%"
                    h="100%"
                    justify="flex-start"
                    align="center"
                    pl="7%"
                  >
                    <LazyLoadImage
                      src={`/StakeIcon/${item.instrument}Form.png`}
                      alt=""
                      style={{ width: "22px", height: "22px" }}
                    />
                    <Text fontWeight="600" ml="10px">
                      {item.instrument}
                    </Text>
                  </Flex>
                  <LightText>
                    {Number(item.pledge)} {item.instrument}
                  </LightText>
                  <LightText>{item.gUSD}</LightText>
                  <LightText>{Number(item.ratio.toFixed(2))}%</LightText>
                  <Flex w="20%" h="100%" justify="center" align="center">
                    {item.type === 1 ? (
                      <Button
                        w="90px"
                        h="40px"
                        borderRadius="10px"
                        bg="transparent"
                        border="1px solid #625ff5"
                        color="#3735A9"
                        fontSize="14px"
                      >
                        {t().stake.open}
                      </Button>
                    ) : (
                      <Button
                        w="90px"
                        h="40px"
                        borderRadius="10px"
                        bg="transparent"
                        border="1px solid #625ff5"
                        color="#3735A9"
                        fontSize="14px"
                      >
                        {t().stake.enter}
                      </Button>
                    )}
                  </Flex>
                </Flex>
              );
            })}
            )
          </VStack>
        </Flex>
        <RHome t={t}/>
      </Foundation>
    </OutLayer>
  );
}
