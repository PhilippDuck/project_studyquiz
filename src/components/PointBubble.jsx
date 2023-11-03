import React from "react";
import { Box, useColorModeValue, Text, Flex } from "@chakra-ui/react";

function PointBubble({ app, display }) {
  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.600")}
      p={1}
      pl={3}
      pr={3}
      rounded={"full"}
      display={display}
    >
      <Text>🧠</Text>
      <Text>
        {app.currentUser.customData.points &&
        app.currentUser.customData.points.$numberInt !== undefined
          ? app.currentUser.customData.points.$numberInt
          : 0}
      </Text>
    </Flex>
  );
}

export default PointBubble;
