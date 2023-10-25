import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function GameDoneScreen() {
  const navigate = useNavigate();
  return (
    <Box>
      <VStack>
        <Heading size={"md"}>Spiel Ende</Heading>
        <Button onClick={() => navigate("/")}>Zur Spielauswahl</Button>
      </VStack>
    </Box>
  );
}

export default GameDoneScreen;
