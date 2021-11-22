import { useEffect, useRef } from "react";
import { Center } from "@chakra-ui/react";

const Tab = ({
  titleA,
  titleB,
  setActive,
  active,
  size,
  setDynamicBack,
  setDynamicBorrow,
  setDynamicStake,
  setDynamicWith,
}) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  useEffect(() => {
    leftRef.current.style.background = "#625FF5";
    leftRef.current.style.color = "#ffffff";
    if (active.left) {
      leftRef.current.style.background = "#625FF5";
      leftRef.current.style.color = "#ffffff";
      rightRef.current.style.background = "transparent";
      rightRef.current.style.color = "#333333";
    } else {
      rightRef.current.style.background = "#625FF5";
      rightRef.current.style.color = "#ffffff";
      leftRef.current.style.background = "transparent";
      leftRef.current.style.color = "#333333";
    }
  });
  // handler for optional dynamic value
  const onLeftHandler = () => {
    setActive({ left: true, right: false });
    if (setDynamicWith && setDynamicBack) {
      setDynamicBack(0);
      setDynamicWith(0);
    }
  };

  const onRightHandler = () => {
    setActive({ left: false, right: true });
    if (setDynamicStake && setDynamicBorrow) {
      setDynamicStake(0);
      setDynamicBorrow(0);
    }
  };
  return (
    <>
      <Center
        ref={leftRef}
        as="button"
        outline="none"
        border="0"
        w="50%"
        p="0"
        m="0"
        cursor="pointer"
        borderRadius="110px"
        fontSize={size}
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        bg="transparent"
        _hover={{ bg: "#625FF5", color: "white" }}
        _active={{ transform: "scale(0.98)" }}
        onClick={onLeftHandler}
      >
        {titleA}
      </Center>
      <Center
        ref={rightRef}
        as="button"
        outline="none"
        p="0"
        border="0"
        m="0"
        w="50%"
        cursor="pointer"
        borderRadius="110px"
        fontSize={size}
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        bg="transparent"
        _hover={{ bg: "#625FF5", color: "white" }}
        onClick={onRightHandler}
      >
        {titleB}
      </Center>
    </>
  );
};

export default Tab;
