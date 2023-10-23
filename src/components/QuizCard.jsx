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
import { useNavigate } from "react-router-dom";

function QuizCard({ quiz, handleDeleteQuiz, isDeleting }) {
  const app = useRealm();
  const navigate = useNavigate();
  // TODO Löschen auch sichtbar für Besitzer des Quiz

  const handleCardClick = () => {
    navigate(`/games/${quiz._id}`);
  };

  const handleDeleteClick = (event, quizId) => {
    event.stopPropagation(); // Verhindert, dass das Klick-Event an übergeordnete Elemente weitergegeben wird
    handleDeleteQuiz(quizId);
  };

  return (
    <Card
      p={3}
      _hover={{ border: "1px", cursor: "pointer", borderColor: "primary.400" }}
      w={"100%"}
      variant={"outline"}
      onClick={handleCardClick}
    >
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
              app.currentUser?.customData?.admin ||
              app.currentUser.id === quiz.owner
                ? "visible"
                : "hidden"
            }
            onClick={(event) => handleDeleteClick(event, quiz._id)}
            variant={"ghost"}
            icon={<MdOutlineDelete />}
          />
        )}
      </Flex>
    </Card>
  );
}

export default QuizCard;
