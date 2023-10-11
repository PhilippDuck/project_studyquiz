import React from "react";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

function CreatedQuestionCard({ question, answers, correctAnswer, hint }) {
  return (
    <Card variant={"outline"} w={"100%"}>
      <CardBody>
        <Heading size={"md"}>{question}</Heading>
        {answers.map((answer) => {
          return <Text>{answer}</Text>;
        })}
        <Text>Hinweis: {hint}</Text>
      </CardBody>
    </Card>
  );
}

export default CreatedQuestionCard;
