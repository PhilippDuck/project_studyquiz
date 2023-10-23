import React from "react";
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MdOutlineQuestionMark } from "react-icons/md";

function Game() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shuffledArray = ["Antwort1", "Antwort2", "Antwort3", "Antwort4"];
  return (
    <Box maxW={"800px"}>
      <Center>
        <Text>{1 + " / " + 3}</Text>
      </Center>
      <Box h={2}></Box>

      <Progress size="sm" colorScheme="primary" value={10} />

      <Box h={4}></Box>
      <Flex w="full">
        <Box flex={1}>
          <Center minH={"32"}>
            <Text fontSize="2xl">Ist dies eine Testfrage?</Text>
          </Center>
        </Box>
        {true != "" ? (
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
        {shuffledArray.map((e, i) => {
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
            Hier könne dein Hinweis stehen.
            <Box h="10px"></Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Game;
