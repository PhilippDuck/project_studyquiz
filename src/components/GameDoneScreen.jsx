import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function GameDoneScreen({ gameData }) {
  const navigate = useNavigate();
  return (
    <Box>
      <VStack>
        <Heading size={"md"}>Spiel Ende</Heading>
        <Text>Fehler: {gameData.mistakes}</Text>
        <Text>
          Benötigte Zeit: {(gameData.endTime - gameData.startTime) / 1000}s
        </Text>
        <Text>Benutzte Hinweise: {gameData.usedHints}</Text>
        <Button onClick={() => navigate("/")}>Zur Spielauswahl</Button>
      </VStack>
    </Box>
  );
}

export default GameDoneScreen;
