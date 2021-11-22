import React, { useRef, useEffect, useContext } from "react";
import { Center, Flex } from "@chakra-ui/react";
import CardTypo from "components/Typography/CardTypo";
import styled from "styled-components";
import { LocaleContext } from "context/localeContentext";

const Fill = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 2px;
  transition: width 1.5s ease-in-out;
`;

const Bar = styled.div`
  width: 90%;
  background: linear-gradient(
    to right,
    #5e51f2 0%,
    #de434d 33%,
    #f2bc36 66%,
    #7eb6ff 100%
  );
  height: 2px;
  margin-top: 2rem;
  position: relative;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  top: -4px;
  left: ${(props) => props.lft};
  position: absolute;
  background: ${(props) => props.bg};
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.5s;
`;

const Outer = styled.div`
  width: 16px;
  height: 16px;
  top: -7px;
  left: ${(props) => props.lft};
  position: absolute;
  background: ${(props) => props.bg};
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.5s;
  opacity: 0.4;
`;

export default function Progressive({ cRatio }) {
  const {
    dispatch: { t },
  } = useContext(LocaleContext);
  const second = useRef(null);
  const third = useRef(null);
  const last = useRef(null);
  const secondOuter = useRef(null);
  const thirdOuter = useRef(null);
  const lastOuter = useRef(null);
  const fillRef = useRef(null);
  useEffect(() => {
    if (cRatio) {
      if (cRatio >= 1000) {
        last.current.style.background = "#7EB6FF";
        lastOuter.current.style.background = "#7EB6FF";
        third.current.style.background = "#F2BC36";
        second.current.style.background = "#DE434D";
        thirdOuter.current.style.background = "#F2BC36";
        secondOuter.current.style.background = "#DE434D";
        fillRef.current.style.width = "0%";
      } else if (cRatio < 1000 && cRatio > 500) {
        third.current.style.background = "#F2BC36";
        second.current.style.background = "#DE434D";
        thirdOuter.current.style.background = "#F2BC36";
        secondOuter.current.style.background = "#DE434D";
        last.current.style.background = "#ffffff";
        lastOuter.current.style.background = "#ffffff";
        fillRef.current.style.width = "25%";
      } else if (cRatio > 200 && cRatio <= 500) {
        second.current.style.background = "#DE434D";
        secondOuter.current.style.background = "#DE434D";
        last.current.style.background = "#ffffff";
        lastOuter.current.style.background = "#ffffff";
        thirdOuter.current.style.background = "#ffffff";
        third.current.style.background = "#ffffff";
        fillRef.current.style.width = "60%";
      } else if (cRatio <= 200 && cRatio > 0) {
        last.current.style.background = "#ffffff";
        lastOuter.current.style.background = "#ffffff";
        thirdOuter.current.style.background = "#ffffff";
        third.current.style.background = "#ffffff";
        second.current.style.background = "#ffffff";
        secondOuter.current.style.background = "#ffffff";
        fillRef.current.style.width = "90%";
      } else if (cRatio == 0) {
        last.current.style.background = "#ffffff";
        lastOuter.current.style.background = "#ffffff";
        thirdOuter.current.style.background = "#ffffff";
        third.current.style.background = "#ffffff";
        second.current.style.background = "#ffffff";
        secondOuter.current.style.background = "#ffffff";
        fillRef.current.style.width = "100%";
      }
    }
  }, [cRatio]);
  return (
    <Center
      w="90%"
      h="120px"
      mt="2rem"
      bg="#dacef5"
      borderRadius="15px"
      flexDirection="column"
    >
      <Flex justify="space-between" w="90%">
        <CardTypo color="#333333" size="14px">
          {t().rightBar.ratio}
        </CardTypo>
        {cRatio ? (
          <CardTypo color="#333333" size="14px" weight="600">
            {cRatio}%
          </CardTypo>
        ) : (
          <CardTypo color="#333333" size="14px" weight="600">
            loading
          </CardTypo>
        )}
      </Flex>

      <Bar>
        <Fill ref={fillRef} />
        <Outer lft="31.7%" bg="white" ref={secondOuter} />
        <Outer lft="64.8%" bg="white" ref={thirdOuter} />
        <Outer lft="94.5%" bg="white" ref={lastOuter} />
        <Outer bg="#5E51F2" lft="-3px" />
        <Dot bg="#5E51F2" />
        <Dot ref={second} bg="white" lft="33%" />
        <Dot ref={third} bg="white" lft="66%" />
        <Dot ref={last} bg="white" lft="96%" />
      </Bar>
      <Flex justify="space-between" w="90%" pl="27%" pr="20%" mt=".5rem">
        <CardTypo color="#333333" size="14px">
          200%
        </CardTypo>
        <CardTypo color="#333333" size="14px">
          500%
        </CardTypo>
      </Flex>
    </Center>
  );
}
