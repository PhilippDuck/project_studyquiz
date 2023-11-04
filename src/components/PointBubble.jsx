import React from "react";
import { Box, useColorModeValue, Text, Flex } from "@chakra-ui/react";

function PointBubble({ points, display }) {
  return (
    <Flex
      gap={1}
      bg={useColorModeValue("gray.50", "gray.600")}
      p={1}
      pl={3}
      pr={3}
      rounded={"full"}
      display={display}
    >
      <Text>🧠</Text>
      <Text>{points}</Text>
    </Flex>
  );
}

export default PointBubble;
