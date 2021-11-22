import { Flex, Center, VStack, Text } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const StakeStat = ({ icon, title, value, unit, suffix }) => {
  return (
    <Flex>
      <Center
        mr="2px"
        w="5.5vw"
        h="100px"
        bg="linear-gradient(-45deg, transparent 8px,  rgba(255, 255, 255, 0.5) 0) no-repeat bottom right, linear-gradient(-135deg, transparent 8px, rgba(255, 255, 255, 0.5) 0) no-repeat top right"
        backgroundSize="100% 50%, 100% 50%"
        borderRadius=" 12px 0 0 12px"
      >
        <LazyLoadImage
          alt=""
          src={icon}
          effect="blur"
          style={{ width: "3vw", height: "auto" }}
        />
      </Center>
      <VStack
        width="10vw"
        height="100px"
        spacing="20px"
        justify="center"
        bg="linear-gradient(135deg, transparent 8px, rgba(255, 255, 255, 0.5) 0) no-repeat top left,
        linear-gradient(45deg, transparent 8px, rgba(255, 255, 255, 0.5) 0) no-repeat bottom left;"
        backgroundSize="100% 50%, 100% 50%"
        borderRadius=" 0 12px 12px 0"
      >
        <Center>
          {value ? (
            <Text fontSize="18px" color="#333333" fontWeight="bold" m="0">
              {unit}
              {value.toFixed(2)}
              {suffix}
            </Text>
          ) : (
            <Text fontSize="18px" color="#333333" fontWeight="bold" m="0">0</Text>
          )}
        </Center>
        <Center>
          <Text fontSize="1rem" color="#666666" fontWeight="400" m="0">
            {title}
          </Text>
        </Center>
      </VStack>
    </Flex>
  );
};

export default StakeStat;
