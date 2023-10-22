import React from "react";
import {
  Card,
  CardBody,
  Text,
  Heading,
  VStack,
  Flex,
  Spacer,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";

function QuizCard({ quiz, handleDeleteQuiz, isDeleting }) {
  const app = useRealm();
  // TODO Löschen auch sichtbar für Besitzer des Quiz
  return (
    <Card
      _hover={{ border: "1px", cursor: "pointer", borderColor: "primary.400" }}
      w={"100%"}
      variant={"outline"}
    >
      <CardBody>
        <Flex>
          <VStack align={"start"}>
            <Text>{quiz.title}</Text>
            <Text fontSize={"xs"}>{quiz.topic}</Text>
          </VStack>
          <Spacer />

          {isDeleting ? (
            <Spinner />
          ) : (
            <IconButton
              visibility={
                app.currentUser?.customData?.admin ? "visible" : "hidden"
              }
              onClick={() => handleDeleteQuiz(quiz._id)}
              variant={"ghost"}
              icon={<MdOutlineDelete />}
            />
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}

export default QuizCard;
