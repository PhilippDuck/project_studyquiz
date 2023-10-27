import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreatedQuestionCard from "./CreatedQuestionCard";

function GameDoneScreen({ gameData, quiz }) {
  const navigate = useNavigate();
  return (
    <Box>
      <VStack>
        <Heading size={"md"} mb={2}>
          Spiel Ende
        </Heading>
        <Text>Fehler: {gameData.mistakes}</Text>
        <Text>
          Benötigte Zeit: {(gameData.endTime - gameData.startTime) / 1000}s
        </Text>
        <Text>Benutzte Hinweise: {gameData.usedHints}</Text>
        <Button mt={2} onClick={() => navigate("/")}>
          Zur Spielauswahl
        </Button>
        <Heading size={"md"} mt={2} mb={2}>
          Fragen:
        </Heading>
        {quiz?.questions.map((question, index) => {
          return (
            <CreatedQuestionCard
              colorScheme={
                gameData.uncorrectAnswers.includes(index)
                  ? "red.500"
                  : "green.500"
              }
              key={index}
              question={question.question}
              answers={question.answers}
              correctAnswer={question.correctAnswer}
              hint={question.hint}
            />
          );
        })}
      </VStack>
    </Box>
  );
}

export default GameDoneScreen;
