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
  Box,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";
import formatUnixTimestamp from "../helperFunctions/formatUnixTimestamp";
import { MdThumbUp } from "react-icons/md";

function QuizCard({ quiz, handleDeleteQuiz, isDeleting, todayPlayed }) {
  const app = useRealm();
  const navigate = useNavigate();

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
      <Flex
        color={
          todayPlayed
            ? useColorModeValue("gray.200", "gray.600")
            : useColorModeValue("gray.500", "gray.200")
        }
      >
        <Box w={"100%"}>
          <Flex align={"center"} gap={1}>
            <Text fontWeight={"bold"}>{quiz.title}</Text>
            <Text fontSize={"xs"}>
              ({quiz.questions.length}{" "}
              {quiz.questions.length > 1 ? "Fragen" : "Frage"})
            </Text>
          </Flex>

          <Box>
            <Text fontStyle={"italic"} fontSize={"xs"}>
              {formatUnixTimestamp(quiz.creationDate)}
            </Text>
            <Flex gap={1}>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                Thema:
              </Text>
              <Text fontSize={"xs"}>{quiz.topic}</Text>
            </Flex>

            <Flex gap={1}>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                Ersteller:
              </Text>
              <Text fontSize={"xs"}>{quiz.ownerNick}</Text>
            </Flex>
          </Box>
        </Box>
        <Spacer />
        <VStack align={"end"} justify={"space-between"}>
          <Flex rounded={"md"} p={1} gap={1} align={"center"}>
            <MdThumbUp />
            <Text fontSize={"xs"}>30</Text>
          </Flex>
          {isDeleting ? (
            <Spinner />
          ) : (
            <IconButton
              size={"sm"}
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
        </VStack>
      </Flex>
    </Card>
  );
}

export default QuizCard;
