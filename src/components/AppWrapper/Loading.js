import React from "react";
import { OutLayer, Foundation } from "../../../pages/index";
import Menu from "components/AppWrapper/Menu";
import { Divider, Center } from "@chakra-ui/react";
import RingLoader from "react-spinners/RingLoader";

export default function Loading() {
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
        <Center h="100%" w="calc(92vw - 250px)">
          <RingLoader color="#625FF5" loading={true} size={80} />
        </Center>
      </Foundation>
    </OutLayer>
  );
}
