import React from "react";
import styled from "styled-components";
import { Flex } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const options = [
  { label: "Gala", value: "GALA", icon: "/StakeIcon/GALAForm.png" },
  { label: "ETH", value: "ETH", icon: "/StakeIcon/ETHForm.png" },
  { label: "BTC", value: "BTC", icon: "/StakeIcon/BTCForm.png" },
  { label: "BNB", value: "BNB", icon: "/StakeIcon/BNBForm.png" },
];

const DropDown = styled.div`
  width: 300px;
  padding: 10px 0;
  border-radius: 4px;
  height: 180px;
  top: 35px;
  right: 5px;
  position: absolute;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(182, 182, 182, 0.5);
`;

export default function TokenDropdown({ handler }) {
  return (
    <DropDown>
      {options.map((item, index) => {
        return (
          <Flex
            w="100%"
            cursor="pointer"
            h="40px"
            pl="20px"
            key={index}
            align="center"
            _hover={{ background: "#625FF5", color: "#FFFFFF" }}
            onClick={() => {
              handler(item.value);
            }}
          >
            <LazyLoadImage
              src={item.icon}
              alt=""
              style={{
                width: "24px",
                height: "auto",
                marginRight: "10px",
              }}
            />
            {item.label}
          </Flex>
        );
      })}
    </DropDown>
  );
}
