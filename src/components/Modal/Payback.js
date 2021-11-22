import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import CardTypo from "components/Typography/CardTypo";
import { CloseIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { LocaleContext } from "context/localeContentext";

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 40px;
  height: calc(450px - 65px);
`;

const Button = styled.button`
  width: 400px;
  height: 60px;
  background-color: #625ff5;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  border: 0;
  font-size: 20px;
  border-radius: 12px;
  transition: all 0.2s ease-in;
  &:active {
    transform: scale(1.02);
  }
`;

const ModalTitle = styled.div`
  background-color: #625ff5;
  color: #ffffff;
  justify-content: space-between;
  display: flex;
  align-items: center;
  height: 65px;
  width: 100%;
  border-radius: 44px 44px 0px 0px;
  padding: 0 20px;
`;

const StyledModal = styled.div`
  background: #d1d1d5;
  width: 500px;
  height: 450px;
  border-radius: 44px;
  padding: 0;
  border: 2px solid #ffffff;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  @media (max-height: 850px) {
    height: 900px;
  }
`;

const Payback = ({ close, show, redeemData, token }) => {
  const [isClient, setIsClient] = useState(false);
  const {
    dispatch: { t },
  } = useContext(LocaleContext);

  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  const colseHandler = (e) => {
    e.preventDefault();
    close();
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API + "/index/dex/redeemAdd",
        {
          instrument_id: token,
          pledge: redeemData.data.pledgeNum,
          gUSD: redeemData.data.personalDebt,
          type: "close",
        }
      );
      if (res.data.code !== "200") {
        close();
        toast.error(`😱 ${res.data.msg}`);
      } else {
        close();
        toast.info(
          `😀 Successfully withdrawed ${redeemData.data.pledgeNum} ${token} and payback ${redeemData.data.personalDebt} gUSD `
        );
      }
    } catch (error) {
      close();
      toast.error(error);
    }
  };

  const payBackModal = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <ModalTitle>
          <CardTypo color="#E6E6E6" size="18px">
            {t().modal.close}
          </CardTypo>
          <CloseIcon
            cursor="pointer"
            w={12}
            h={12}
            color="#B1B9C1"
            onClick={colseHandler}
          />
        </ModalTitle>
        <StyledModalBody>
          <Flex
            w="400px"
            h="66px"
            bg="rgba(255, 255, 255, 0.4)"
            borderRadius="14px"
            border="2px solid #ffffff"
            align="center"
            justify="space-between"
            pl="30px"
            pr="20px"
          >
            <Flex w="85%" align="center" justify="space-between">
              <CardTypo color="#625FF5" size="16px">
                {t().modal.repay}
              </CardTypo>
              <CardTypo color="#333333" size="20px" weight="600">
                {Number(redeemData.data.personalDebt.toFixed(2))}
              </CardTypo>
            </Flex>
            <CardTypo color="#333333" size="16px">
              gUSD
            </CardTypo>
          </Flex>
          <Flex
            w="400px"
            h="66px"
            bg="rgba(255, 255, 255, 0.4)"
            borderRadius="14px"
            border="2px solid #ffffff"
            align="center"
            justify="space-between"
            pl="30px"
            pr="20px"
          >
            <Flex w="85%" align="center" justify="space-between">
              <CardTypo color="#625FF5" size="16px">
                {t().modal.withdraw}
              </CardTypo>
              <CardTypo color="#333333" size="20px" weight="600">
                {Number(redeemData.data.pledgeNum)}
              </CardTypo>
            </Flex>
            <CardTypo color="#333333" size="16px">
              {token}
            </CardTypo>
          </Flex>
          <Button onClick={submitHandler}>{t().modal.confirm}</Button>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;
  if (isClient) {
    return ReactDOM.createPortal(
      payBackModal,
      document.getElementById("payback-modal")
    );
  } else {
    return null;
  }
};

export default Payback;
