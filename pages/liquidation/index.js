/* eslint-disable react/no-children-prop */
import { OutLayer, Foundation } from "../index";
import { useState, useRef, useEffect, useContext } from "react";
import Menu from "components/AppWrapper/Menu";
import {
  Divider,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiqData } from "constants/data";
import { LightText } from "components/Typography";
import Pagination from "components/Pagination";
import useSWR from "swr";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "components/AppWrapper/Loading";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LocaleContext } from "context/localeContentext";

export default function Liquidation() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_API + "index/dex/clearList",
    fetcher
  );
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const addrRef = useRef(null);
  const [addr, setAddr] = useState("");
  const [pagination, setPagination] = useState(false);
  const [last, setLast] = useState(5);
  const [first, setFirst] = useState(0);

  useEffect(() => {
    if (data) {
      if (data.data.length > 5) {
        setPagination(true);
      }
    }
  }, [data]);
  const copyHandler = () => {
    toast.info("😀 copied to clipboard!!", {
      position: "top-center",
    });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (!addrRef.current.value) {
      toast.error("🦄 Please gives a valid wallet address");
      setAddr("");
      if (data.data.length <= 5) {
        setPagination(false);
      } else {
        setPagination(true);
      }
    } else if (data) {
      const locate = data.data.find(({ address }) => {
        return address === addrRef.current.value;
      });
      if (!locate) {
        setAddr("");
        if (data.data.length <= 5) {
          setPagination(false);
        } else {
          setPagination(true);
        }
        toast.error("😱 Wallet Address not found in the Liquidation List");
      } else {
        setAddr(addrRef.current.value);
      }
    }
    addrRef.current.value = "";
  };

  const navTo = (number) => {
    setLast(number * 5);
    setFirst(number * 5 - 5);
  };

  const LiquidationHandler = async (userId, tokenId) => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API + "/index/dex/clear",
        {
          u_id: userId,
          instrument_id: tokenId,
        }
      );
      if (res.data.code !== "200") {
        toast.error(`用户${userId} ${res.data.msg}`);
      } else {
        toast.success(`successfully liquidate user ${userId}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };
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
          h="100%"
          w="calc(92vw - 250px)"
          flexDirection="column"
          overflowY="auto"
          overflowX="hidden"
        >
          <InputGroup ml="2.5%" mt="15%">
            <InputLeftElement
              pointerEvents="none"
              h="100%"
              ml="20px"
              children={<SearchIcon h="50%" w={21} color="#B1B9C1" />}
            />
            <Input
              ref={addrRef}
              type="tel"
              h="40px"
              w="340px"
              fontSize="14pxbv "
              pl="50px"
              placeholder={t().liquidation.pholder}
              bg="rgba(255, 255, 255, 0.6)"
              outline="none"
              border="1px solid #E7E7E7"
              borderRadius="14px"
            />
            <Button
              ml="2rem"
              outline="none"
              bg="#625FF5"
              border="0"
              color="white"
              cursor="pointer"
              h="40px"
              w="120px"
              borderRadius="12px"
              fontSize="18px"
              onClick={searchHandler}
              transition="transfrom .2s ease-in-out"
              _hover={{
                boxShadow: `3px 3px 10px #625FF5, -3px -3px 10px #625FF5`,
              }}
              _active={{ transform: `scale(1.02)` }}
            >
              {t().liquidation.submit}
            </Button>
          </InputGroup>
          <Flex
            w="95%"
            h="60px"
            bg="rgba(98, 95, 245, 0.2)"
            ml="2.5%"
            mt="2rem"
            align="center"
          >
            {LiqData.map((item, index) => {
              return (
                <Text
                  key={index}
                  w="20%"
                  textAlign="center"
                  color="#333333"
                  fontWeight="bold"
                  fontSize="16px"
                >
                  {t().liquidation[item]}
                </Text>
              );
            })}
          </Flex>
          <VStack w="95%" ml="2.5%" spacing="1rem" mt="2rem" h="350px">
            {data.data
              .filter((item) => {
                if (!addr) {
                  return item;
                } else if (
                  item.address.toLowerCase().includes(addr.toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(first, last)
              .map((item, index) => {
                return (
                  <Flex
                    key={index}
                    w="100%"
                    h="60px"
                    bg="rgba(255, 255, 255, 0.7)"
                    borderRadius="12px"
                    border="3px solid #ffffff"
                    boxShadow=" 0px 2px 4px 0px rgba(213, 213, 213, 0.5)"
                    _hover={{ transform: `scale(1.02)` }}
                    transition="transform .2s ease-in-out"
                  >
                    <Flex w="20%" h="100%" justify="center" align="center">
                      <Text mr="1rem">{item.address}</Text>
                      <CopyToClipboard text={item.address}>
                        <LazyLoadImage
                          className="copy"
                          src="/tools/copy.png"
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                          alt=""
                          onClick={() => {
                            copyHandler();
                          }}
                        />
                      </CopyToClipboard>
                    </Flex>

                    <LightText>
                      {Number(item.amount)} {item.instrument}
                    </LightText>
                    <LightText>{item.personalDebt}</LightText>
                    <LightText>{item.currentPledgeRatio}%</LightText>
                    <Flex w="20%" h="100%" justify="center" align="center">
                      <Button
                        w="90px"
                        h="40px"
                        cursor="pointer"
                        borderRadius="10px"
                        bg="transparent"
                        border="1px solid #625ff5"
                        color="#3735A9"
                        fontSize="14px"
                        transition="transfrom .2s ease-in-out"
                        _hover={{ transform: `scale(1.02)` }}
                        onClick={() =>
                          LiquidationHandler(item.address, item.instrument)
                        }
                      >
                        {t().liquidation.liquidate}
                      </Button>
                    </Flex>
                  </Flex>
                );
              })}
          </VStack>
          {pagination && data && (
            <Pagination count={data.data.length} setCurrent={navTo} />
          )}
        </Flex>
      </Foundation>
    </OutLayer>
  );
}
