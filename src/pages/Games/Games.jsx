import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Spinner,
  VStack,
  Flex,
  Spacer,
  Button,
  Box,
  useDisclosure,
  useToast,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useRealm } from "../../provider/RealmProvider";
import QuizCard from "./Components/QuizCard";
import DeleteQuizDialog from "./Components/DeleteQuizDialog";
import TopicMenu from "./Components/TopicMenu";
import { MdOutlineClose } from "react-icons/md";

/**
 * Die `Games`-Komponente stellt eine Liste von Quizspielen dar und ermöglicht es dem Benutzer,
 * vorhandene Quizspiele zu betrachten, nach Themen zu filtern und Quizspiele zu löschen.
 *
 * @component
 * @example
 * return (
 *   <Games />
 * )
 *
 * Funktionen:
 * - `getQuizzes`: Lädt die verfügbaren Quizspiele aus der Datenbank.
 * - `handleDeleteQuiz`: Bereitet das Löschen eines bestimmten Quizspiels vor.
 * - `deleteQuizById`: Löscht ein Quizspiel basierend auf seiner ID.
 * - `handleFilterTopic`: Aktualisiert den Filterzustand basierend auf dem ausgewählten Thema.
 *
 * Zustände:
 * - `loadingQuizzes`: Zeigt an, ob die Quizspiele gerade geladen werden.
 * - `quizzes`: Enthält die geladenen Quizspiele.
 * - `quizIdToDelete`: Speichert die ID des zu löschenden Quizspiels.
 * - `topic`: Aktueller Filterzustand für die Anzeige der Quizspiele.
 *
 * Zusätzliche Komponenten:
 * - `QuizCard`: Stellt einzelne Quizspiele in einer Liste dar.
 * - `DeleteQuizDialog`: Ein Dialog zum Bestätigen des Löschens eines Quizspiels.
 * - `TopicMenu`: Ein Menü zur Auswahl eines Themenfilters.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling.
 */
function Games() {
  const app = useRealm();
  const toast = useToast();
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topic, setTopic] = useState("kein Filter");

  useEffect(() => {
    // Überprüfen, ob ein Benutzer angemeldet ist
    if (app.currentUser) {
      getQuizzes();
    } else {
      setLoadingQuizzes(false); // Stellen Sie sicher, dass der Spinner nicht angezeigt wird, wenn kein Benutzer angemeldet ist
    }
  }, [app.currentUser]);

  async function getQuizzes() {
    try {
      setLoadingQuizzes(true);
      const result = await app.currentUser.functions.getQuizzes();
      setQuizzes(result);
      console.log(result);
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten:", error);
    } finally {
      setLoadingQuizzes(false);
    }
  }

  function handleDeleteQuiz(id) {
    setQuizIdToDelete(id);
    onOpen();
  }

  async function deleteQuizById(id) {
    try {
      const result = await app.currentUser.functions.deleteQuizById(
        JSON.stringify({ id: id })
      );
      if (result.success) {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== id)
        );
        toast({
          title: "Quiz erfolgreich gelöscht.",

          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Fehler",
          description: `Fehler beim Löschen des Quiz: ${result.error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten:", error);
    }
  }

  function handleFilterTopic(topic) {
    setTopic(topic);
  }

  return (
    <Container p={0} variant={"outline"} border={"none"} maxW={"800px"}>
      <Flex direction={["column", "row"]} mb={4}>
        <Heading>Spiele</Heading>

        <Spacer />
        <Flex gap={1} justify={"space-between"}>
          <Button
            fontWeight={"light"}
            mt={2}
            mb={4}
            size={"xs"}
            variant={"outline"}
            rightIcon={<MdOutlineClose />}
            onClick={() => {
              setTopic("kein Filter");
            }}
          >
            {topic}
          </Button>

          <TopicMenu handleFiltertopic={handleFilterTopic} />
        </Flex>
      </Flex>

      <VStack align={"start"} w={"100%"}>
        {!app.currentUser ? (
          <Text>Bitte melden Sie sich an, um auf Spiele zuzugreifen.</Text>
        ) : loadingQuizzes ? (
          <Spinner />
        ) : (
          <>
            {quizzes
              // Filter quizzes based on the selected topic if it's not "kein Filter"
              .filter(
                (quiz) =>
                  (topic === "kein Filter" || quiz.topic === topic) &&
                  !quiz.todayPlayed
              )
              .map((quiz) => (
                <QuizCard
                  quiz={quiz}
                  handleDeleteQuiz={handleDeleteQuiz}
                  todayPlayed={quiz.todayPlayed}
                  key={quiz._id}
                >
                  {" "}
                </QuizCard>
              ))}
          </>
        )}
        <Accordion mt={4} w={"100%"} allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading fontWeight={"light"} size={"md"}>
                  Heute bereits gespielte Quiz:
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel p={0} pb={4}>
              <VStack mt={6}>
                {quizzes
                  // Filter quizzes based on the selected topic if it's not "kein Filter"
                  .filter(
                    (quiz) =>
                      (topic === "kein Filter" || quiz.topic === topic) &&
                      quiz.todayPlayed
                  )
                  .map((quiz) => (
                    <QuizCard
                      quiz={quiz}
                      handleDeleteQuiz={handleDeleteQuiz}
                      todayPlayed={quiz.todayPlayed}
                      key={quiz._id}
                    >
                      {" "}
                    </QuizCard>
                  ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
      <DeleteQuizDialog
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        deleteQuizById={deleteQuizById}
        quizIdToDelete={quizIdToDelete}
      />
    </Container>
  );
}

export default Games;
