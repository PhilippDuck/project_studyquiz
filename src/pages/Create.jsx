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
  HStack,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import AddQuestionDrawer from "../components/AddQuestionDrawer";
import { useForm } from "react-hook-form";
import { MdAdd, MdSave } from "react-icons/md";

function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "Quiz erstellt",
      description: JSON.stringify(data),
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Card variant={"outline"} maxW={"800px"}>
      <CardBody>
        <VStack gap={"2em"} w={"100%"} align={"start"}>
          <Box w={"100%"}>
            <HStack mb={"1em"} justify={"space-between"}>
              <Heading>Quiz erstellen</Heading>
              <Button
                onClick={handleSubmit(onSubmit)} // Hier ist die Verknüpfung!
                colorScheme="primary"
                leftIcon={<MdSave />}
              >
                Speichern
              </Button>
            </HStack>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="title"
                marginBottom="20px"
                isInvalid={errors.title}
              >
                <FormLabel>Titel:</FormLabel>
                <Input
                  type="text"
                  placeholder="Geben Sie einen Titel ein"
                  {...register("title", {
                    required: "Titel ist erforderlich!",
                  })}
                />
                {errors.title && (
                  <FormHelperText color="red.500">
                    {errors.title.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                id="topic"
                marginBottom="20px"
                isInvalid={errors.topic}
              >
                <FormLabel>Thema auswählen:</FormLabel>
                <Select
                  placeholder="Wählen Sie ein Thema"
                  {...register("topic", {
                    required: "Thema ist erforderlich!",
                  })}
                >
                  <option value="thema1">Thema 1</option>
                  <option value="thema2">Thema 2</option>
                  <option value="thema3">Thema 3</option>
                </Select>
                {errors.topic && (
                  <FormHelperText color="red.500">
                    {errors.topic.message}
                  </FormHelperText>
                )}
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
