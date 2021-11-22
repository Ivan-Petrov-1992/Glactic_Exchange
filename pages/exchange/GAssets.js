import { useContext } from "react";
import ExMenu from "components/AppWrapper/ExMenu";
import { Flex } from "@chakra-ui/react";
import AssetPrice from "components/Card/Exchange/AssetPrice";
import AssetOperation from "components/Card/Exchange/AssetOperation";
import OrderHistory from "components/Card/Exchange/OrderHistory";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocaleContext } from "context/localeContentext";
import styled from "styled-components";

const Container = styled(Flex)`
  background-color: #131316;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-image: none;
`;

export default function GAssets() {
  const router = useRouter();
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const { asset } = router.query;
  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />

      <Flex w="100%" h="max-content">
        <ExMenu t={t} />
        <Flex
          w="calc(100vw - 300px)"
          h="100%"
          align="center"
          direction="column"
        >
          <AssetPrice asset={asset} t={t} />
          <AssetOperation asset={asset} t={t} />
          <OrderHistory t={t} />
        </Flex>
      </Flex>
    </Container>
  );
}
