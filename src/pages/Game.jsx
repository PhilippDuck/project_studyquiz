import React, { useState, useEffect } from "react";
import {
  Center,
  Text,
  Box,
  Progress,
  Heading,
  SimpleGrid,
  Button,
  Flex,
  Tooltip,
  IconButton,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";

function Game() {
  const app = useRealm();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shuffledArray = ["Antwort1", "Antwort2", "Antwort3", "Antwort4"];
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    // Überprüfen, ob ein Benutzer angemeldet ist
    if (app.currentUser) {
      getQuiz(id);
    } else {
      setloadingQuiz(false); // Stellen Sie sicher, dass der Spinner nicht angezeigt wird, wenn kein Benutzer angemeldet ist
    }
  }, []);

  async function getQuiz(id) {
    setLoadingQuiz(true);
    try {
      const result = await app.currentUser.functions.getQuizById({ id: id });
      setQuiz(result);
      //console.log(result);
    } catch (error) {
      console.log(error);
    }
    setLoadingQuiz(false);
  }

  return (
    <Box maxW={"800px"}>
      {loadingQuiz ? (
        <Center>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          <Center>
            <Text>{1 + " / " + 3}</Text>
          </Center>
          <Box h={2}></Box>

          <Progress size="sm" colorScheme="primary" value={10} />

          <Box h={4}></Box>
          <Flex w="full">
            <Box flex={1}>
              <Center minH={"32"}>
                <Text fontSize="2xl">{quiz?.title}</Text>
              </Center>
            </Box>
            {quiz?.questions[0].hint != "" ? (
              <IconButton
                onClick={() => {
                  onOpen();
                  //props.handleHintUsed();
                }}
                isRound="true"
                aria-label="Search database"
                icon={<MdOutlineQuestionMark />}
              />
            ) : (
              <></>
            )}
          </Flex>
          <SimpleGrid columns={[1, 1, 2]} spacing={5} w="100%">
            {quiz?.questions[0].answers.map((e, i) => {
              return (
                <Button
                  variant={"outline"}
                  minH={[16, 24]}
                  w="full"
                  whiteSpace={"normal"}
                  key={i}
                >
                  {e}
                </Button>
              );
            })}
          </SimpleGrid>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="300px">
              <ModalHeader>Hinweis</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {quiz?.questions[0].hint}
                <Box h="10px"></Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Game;
