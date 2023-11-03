import React, { useState, useEffect, useRef } from "react";
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
  Container,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";
import GameDoneScreen from "../components/GameDoneScreen";
import shuffleArray from "../helperFunctions/shuffleArray";

function Game() {
  const gameDoneRef = useRef();
  const app = useRealm();
  const toast = useToast();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quiz, setQuiz] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameIsDone, setGameIsDone] = useState(false);
  const [gameData, setGameData] = useState({
    mistakes: 0,
    startTime: Date.now(),
    usedHints: 0,
    uncorrectAnswers: [],
    quizId: id,
    points: 0,
  });

  useEffect(() => {
    // Überprüfen, ob ein Benutzer angemeldet ist
    if (app.currentUser) {
      getQuiz(id);
    } else {
      setLoadingQuiz(false);
    }
    return () => {
      // Wenn das Spiel vorzeitig abgebrochen wird, wird es dennoch als gespielt gewertet.
      if (!gameDoneRef.current) {
        console.log("Spiel wurde vorzeitig abgebrochen.");
        setPlayedQuiz(true);
      }
      gameDoneRef.current = false;
    };
  }, []);

  async function getQuiz(id) {
    setLoadingQuiz(true);
    try {
      const result = await app.currentUser.functions.getQuizById({ id: id });
      const shuffledResult = shuffleArray(result.questions);

      setQuiz(result);
      console.log(result);
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
        setGameData({
          ...gameData,
          endTime: Date.now(),
        });
        setPlayedQuiz();
        setGameIsDone(true);
        gameDoneRef.current = true;
      }
    } else {
      setGameData({
        ...gameData,
        mistakes: gameData.mistakes + 1,
        uncorrectAnswers: [...gameData.uncorrectAnswers, currentQuestion],
      });
      toast({
        title: "Falsch!",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  async function setPlayedQuiz(quizCanceled) {
    // Points sind relativ. Maximal 100 %. Minimal 0% Benutzte Hinweise kosten 1%.
    // Falsche Antworten werden über einen Dreisatz abgezogen
    let points = 0;
    if (!quizCanceled) {
      const calculatedPoints =
        100 -
        (100 / quiz.questions.length) * gameData.mistakes -
        gameData.usedHints;
      points = calculatedPoints <= 0 ? 0 : calculatedPoints;
    }

    try {
      const finishedGameData = {
        ...gameData,
        endTime: Date.now(),
        playerId: app.currentUser.id,
        points: Math.round(points),
        done: quizCanceled ? false : true,
      };
      setGameData(finishedGameData);
      const result = await app.currentUser.functions.setPlayedQuiz(
        finishedGameData
      );
      await app.currentUser.refreshCustomData();
      console.log(result);
      if (!quizCanceled) {
        if (result.status === "success" && points > 0) {
          toast({
            title: `Deinem Profil werden ${points} Punkte hinzugefügt 💪.`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (result.status === "already_played") {
          toast({
            title: `Heute schon Punkte erhalten, komme morgen wieder!`,
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        } else if (result.status === "own_quiz") {
          toast({
            title: `Für das eigene Quiz erhälst du keine Punkte.`,
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container p={0} maxW={"800px"}>
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
            <GameDoneScreen gameData={gameData} quiz={quiz} />
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
                      setGameData({
                        ...gameData,
                        usedHints: gameData.usedHints + 1,
                      });
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
                      fontWeight={"light"}
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
              </Modal>{" "}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default Game;
