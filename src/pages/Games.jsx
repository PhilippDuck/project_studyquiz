import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Spinner,
  VStack,
  Flex,
  Spacer,
  IconButton,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import QuizCard from "../components/QuizCard";
import { MdOutlineFilterAlt } from "react-icons/md";
import DeleteQuizDialog from "../components/DeleteQuizDialog";

function Games() {
  const app = useRealm();
  const toast = useToast();
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <Box variant={"outline"} border={"none"} maxW={"800px"}>
      <Flex>
        <Heading mb={4}>Spiele</Heading>
        <Spacer />
        <IconButton icon={<MdOutlineFilterAlt />} variant={"ghost"} />
      </Flex>
      <VStack align={"start"} w={"100%"}>
        {!app.currentUser ? (
          <Text>Bitte melden Sie sich an, um auf Spiele zuzugreifen.</Text>
        ) : loadingQuizzes ? (
          <Spinner />
        ) : (
          quizzes.map((quiz) => (
            <QuizCard
              quiz={quiz}
              handleDeleteQuiz={handleDeleteQuiz}
              key={quiz._id}
            >
              {" "}
            </QuizCard>
          ))
        )}
      </VStack>
      <DeleteQuizDialog
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        deleteQuizById={deleteQuizById}
        quizIdToDelete={quizIdToDelete}
      />
    </Box>
  );
}

export default Games;
