import React from "react";
import {
  Container,
  Button,
  useDisclosure,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Card,
  CardBody,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import AddQuestionDrawer from "../components/AddQuestionDrawer";
import { MdAdd } from "react-icons/md";

function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card variant={"outline"} maxW={"800px"}>
      <CardBody>
        <VStack gap={"2em"} w={"100%"} align={"start"}>
          <Heading>Quiz erstellen</Heading>

          <Box w={"100%"}>
            <form>
              <FormControl id="title" marginBottom="20px">
                <FormLabel>Titel:</FormLabel>
                <Input type="text" placeholder="Geben Sie einen Titel ein" />
              </FormControl>

              <FormControl id="topic" marginBottom="20px">
                <FormLabel>Thema auswählen:</FormLabel>
                <Select placeholder="Wählen Sie ein Thema">
                  <option value="thema1">Thema 1</option>
                  <option value="thema2">Thema 2</option>
                  <option value="thema3">Thema 3</option>
                </Select>
              </FormControl>
            </form>
          </Box>
          <Flex w={"100%"} align={"center"}>
            <Heading size={"md"}>Fragen:</Heading>
            <Spacer />
            <Button
              leftIcon={<MdAdd />}
              size={"sm"}
              variant={"outline"}
              onClick={onOpen}
            >
              Frage hinzufügen
            </Button>
          </Flex>

          <AddQuestionDrawer
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
          />
        </VStack>
      </CardBody>
    </Card>
  );
}

export default Create;
