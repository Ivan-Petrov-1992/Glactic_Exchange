import { OutLayer, Foundation } from "../index";
import { useContext } from "react";
import Menu from "components/AppWrapper/Menu";
import { Divider, Flex } from "@chakra-ui/react";
import StakeClaim from "components/Card/Claim/StakeClaim";
import { ClaimData, TransClaim, DistClaim } from "constants/data";
import axios from "axios";
import useSWR from "swr";
import Loading from "components/AppWrapper/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocaleContext } from "context/localeContentext";

export default function Claim() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "/index/dex/claim",
    fetcher,
    { refreshInterval: 5000 }
  );
  if (!data) {
    return <Loading />;
  }
  return (
    <OutLayer>
      <Foundation>
        <ToastContainer
          position="top-right"
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

        <Flex
          w="calc(92vw - 250px)"
          flexDirection="column"
          overflowY="auto"
          align="center"
        >
          <Flex
            w="95%"
            h="max-content"
            mt="80px"
            shrink="0"
            bg="rgba(255, 255, 255, 0.5)"
            borderRadius="30px"
            border="2px solid #FFFFFF"
          >
            <StakeClaim
              data={ClaimData}
              title={t().claim.stake}
              claim={data.data.Pledge}
              t={t}
              post="stake"
            />
          </Flex>
          <Flex
            w="95%"
            h="max-content"
            mt="30px"
            bg="rgba(255, 255, 255, 0.5)"
            borderRadius="30px"
            border="2px solid #FFFFFF"
            shrink="0"
          >
            <StakeClaim
              data={TransClaim}
              title={t().claim.tran}
              t={t}
              post="trade"
              claim={data.data.trade}
            />
          </Flex>
          <Flex
            w="95%"
            h="max-content"
            mt="30px"
            shrink="0"
            bg="rgba(255, 255, 255, 0.5)"
            borderRadius="30px"
            border="2px solid #FFFFFF"
          >
            <StakeClaim
              data={TransClaim}
              title={t().claim.pool}
              t={t}
              claim={data.data.stable}
              post="stable"
            />
          </Flex>
          <Flex
            w="95%"
            mt="30px"
            mb="60px"
            h="max-content"
            shrink="0"
            bg="rgba(255, 255, 255, 0.5)"
            borderRadius="30px"
            border="2px solid #FFFFFF"
          >
            <StakeClaim
              data={DistClaim}
              title={t().claim.distribution}
              t={t}
              claim={data.data.distribution}
              post="distribution"
            />
          </Flex>
        </Flex>
      </Foundation>
    </OutLayer>
  );
}
