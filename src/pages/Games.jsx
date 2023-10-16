import React, { useState, useEffect } from "react";
import { Card, CardBody, Heading, Text, Spinner } from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import { load } from "webfontloader";

function Games() {
  const app = useRealm();
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes();
  }, []);

  /**
   * Holt alle Quiz aus der DB und lädt sie in den State "quizzes"
   */
  async function getQuizzes() {
    setLoadingQuizzes(true);
    const result = await app.currentUser.functions.getQuizzes();
    console.log(result);
    setQuizzes(result);
    setLoadingQuizzes(false);
  }

  return (
    <Card variant={"outline"} maxW={"800px"}>
      <CardBody>
        <Heading>Spiele</Heading>
        {loadingQuizzes ? (
          <Spinner />
        ) : (
          quizzes.map((quiz) => {
            return <Text key={quiz._id}>{quiz.title}</Text>;
          })
        )}
      </CardBody>
    </Card>
  );
}

export default Games;
