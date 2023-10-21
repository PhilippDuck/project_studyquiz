import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  Spinner,
  VStack,
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import QuizCard from "../components/QuizCard";
import { MdOutlineFilterAlt } from "react-icons/md";

function Games() {
  const app = useRealm();
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

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

  return (
    <Card variant={"outline"} border={"none"} maxW={"800px"}>
      <CardBody>
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
                quiztitle={quiz.title}
                quiztopic={quiz.topic}
                key={quiz._id}
              ></QuizCard>
            ))
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

export default Games;
