import React from "react";
import { Card, CardBody, Text, Heading } from "@chakra-ui/react";

function QuizCard({ quiztitle, quiztopic }) {
  return (
    <Card
      _hover={{ border: "1px", cursor: "pointer", borderColor: "primary.400" }}
      w={"100%"}
      variant={"outline"}
    >
      <CardBody>
        <Text>{quiztitle}</Text>
        <Text fontSize={"xs"}>{quiztopic}</Text>
      </CardBody>
    </Card>
  );
}

export default QuizCard;
