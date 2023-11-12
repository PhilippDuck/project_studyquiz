import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreatedQuestionCard from "../../../components/CreatedQuestionCard";
import { useRealm } from "../../../provider/RealmProvider";
import {
  MdOutlineArrowBack,
  MdThumbUp,
  MdOutlineThumbUp,
} from "react-icons/md";

function GameDoneScreen({ gameData, quiz }) {
  const app = useRealm();
  const toast = useToast();
  const [loadingReport, setLoadingReport] = useState(false);
  async function reportQuestion(question) {
    setLoadingReport(true);
    try {
      const result = await app.currentUser.functions.reportQuestion({
        question: question,
        quizId: quiz._id,
        reportedBy: app.currentUser.id,
      });
      if (result.status === "success") {
        toast({
          title: result.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingReport(false);
  }

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
              <Tr>
                <Td>Punkte:</Td>
                <Td isNumeric>{gameData.points}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <ButtonGroup mt={4} mb={4}>
          <Button
            colorScheme="primary"
            onClick={() => navigate("/")}
            leftIcon={<MdOutlineArrowBack />}
          >
            Zurück zur Spielauswahl
          </Button>
          <Button
            fontWeight={"light"}
            variant={"outline"}
            leftIcon={<MdOutlineThumbUp />}
            isDisabled
          >
            Like!
          </Button>
        </ButtonGroup>
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
              question={question}
              reportPossible={true}
              reportQuestion={reportQuestion}
              loading={loadingReport}
            />
          );
        })}
      </VStack>
    </Box>
  );
}

export default GameDoneScreen;
