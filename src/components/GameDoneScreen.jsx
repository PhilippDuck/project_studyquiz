import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreatedQuestionCard from "./CreatedQuestionCard";

function GameDoneScreen({ gameData, quiz }) {
  const navigate = useNavigate();
  return (
    <Box>
      <VStack>
        <Heading size={"lg"} mb={2}>
          Spiel Ende
        </Heading>
        <TableContainer w={"100%"}>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Fehler</Td>

                <Td isNumeric>{gameData.mistakes}</Td>
              </Tr>
              <Tr>
                <Td>Benötigte Zeit:</Td>

                <Td isNumeric>
                  {(gameData.endTime - gameData.startTime) / 1000}s
                </Td>
              </Tr>
              <Tr>
                <Td>Benutzte Hinweise:</Td>

                <Td isNumeric>{gameData.usedHints}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Button
          colorScheme="primary"
          mt={4}
          mb={4}
          onClick={() => navigate("/")}
        >
          Zur Spielauswahl
        </Button>
        <Heading size={"md"} mt={2} mb={2}>
          Fragen:
        </Heading>
        {quiz?.questions.map((question, index) => {
          return (
            <CreatedQuestionCard
              colorscheme={
                gameData.uncorrectAnswers.includes(index)
                  ? "red.500"
                  : "green.500"
              }
              key={index}
              question={question.question}
              answers={question.answers}
              correctAnswer={question.correctAnswer}
              hint={question.hint}
              reportPossible={true}
            />
          );
        })}
      </VStack>
    </Box>
  );
}

export default GameDoneScreen;
