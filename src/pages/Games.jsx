import React, { useState, useEffect } from "react";
import { Card, CardBody, Heading, Text, Spinner } from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";

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
    <Card variant={"outline"} maxW={"800px"}>
      <CardBody>
        <Heading>Spiele</Heading>
        {!app.currentUser ? (
          <Text>Bitte melden Sie sich an, um auf Spiele zuzugreifen.</Text>
        ) : loadingQuizzes ? (
          <Spinner />
        ) : (
          quizzes.map((quiz) => <Text key={quiz._id}>{quiz.title}</Text>)
        )}
      </CardBody>
    </Card>
  );
}

export default Games;
