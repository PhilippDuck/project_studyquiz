import React, { useState, useEffect } from "react";
import {
  Center,
  Text,
  Box,
  Progress,
  SimpleGrid,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";
import GameDoneScreen from "../components/GameDoneScreen";

function Game() {
  const app = useRealm();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quiz, setQuiz] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameIsDone, setGameIsDone] = useState(false);

  useEffect(() => {
    // Überprüfen, ob ein Benutzer angemeldet ist
    if (app.currentUser) {
      getQuiz(id);
    } else {
      setLoadingQuiz(false); // Stellen Sie sicher, dass der Spinner nicht angezeigt wird, wenn kein Benutzer angemeldet ist
    }
  }, []);

  async function getQuiz(id) {
    setLoadingQuiz(true);
    try {
      const result = await app.currentUser.functions.getQuizById({ id: id });
      setQuiz(result);
      //console.log(result);
    } catch (error) {
      console.log(error);
    }
    setLoadingQuiz(false);
  }
  /**
   * Prüft die Antwort auf korrektheit
   * @param {*} quiz
   * @param {Int} answer
   */
  function checkAnswer(quiz, answer) {
    if (answer == quiz.questions[currentQuestion].correctAnswer) {
      toast({
        title: "Richtig!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setCurrentQuestion((prev) => {
        const newQuestion = prev + 1;
        return newQuestion;
      });
      if (currentQuestion + 1 == quiz?.questions.length) {
        setGameIsDone(true);
      }
    } else {
      toast({
        title: "Falsch!",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  return (
    <Box maxW={"800px"}>
      {loadingQuiz ? (
        <Center>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          <Center>
            <Text>{currentQuestion + " / " + quiz?.questions.length}</Text>
          </Center>
          <Box h={2}></Box>

          <Progress
            size="sm"
            colorScheme="primary"
            value={(100 / quiz?.questions.length) * currentQuestion}
          />

          <Box h={4}></Box>
          {gameIsDone ? (
            <GameDoneScreen />
          ) : (
            <>
              <Flex w="full">
                <Box flex={1}>
                  <Center minH={"32"}>
                    <Text fontSize="2xl">
                      {quiz?.questions[currentQuestion].question}
                    </Text>
                  </Center>
                </Box>
                {quiz?.questions[0].hint != "" ? (
                  <IconButton
                    onClick={() => {
                      onOpen();
                      //props.handleHintUsed();
                    }}
                    isRound="true"
                    aria-label="Search database"
                    icon={<MdOutlineQuestionMark />}
                  />
                ) : (
                  <></>
                )}
              </Flex>
              <SimpleGrid columns={[1, 1, 2]} spacing={5} w="100%">
                {quiz?.questions[currentQuestion].answers.map((e, i) => {
                  return (
                    <Button
                      variant={"outline"}
                      minH={[16, 24]}
                      w="full"
                      whiteSpace={"normal"}
                      key={i}
                      onClick={() => checkAnswer(quiz, i)}
                    >
                      {e}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </>
          )}
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="300px">
              <ModalHeader>Hinweis</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {quiz?.questions[currentQuestion].hint}
                <Box h="10px"></Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Game;
