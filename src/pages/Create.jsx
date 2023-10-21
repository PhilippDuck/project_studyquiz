import React from "react";
import { useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import AddQuestionDrawer from "../components/AddQuestionDrawer";
import { useForm } from "react-hook-form";
import { MdAdd, MdSave } from "react-icons/md";
import { useRealm } from "../provider/RealmProvider";
import CreatedQuestionCard from "../components/CreatedQuestionCard";
import { useNavigate } from "react-router-dom";
import { load } from "webfontloader";

/**
 * "Erstellen" Seite. Dient dem erstellen eines neuen Quiz
 */
function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [questions, setQuestions] = useState([]);
  const app = useRealm();
  const navigate = useNavigate();
  const [loadingSaveQuiz, setLoaddingSaveQuiz] = useState(false);

  /**
   * Verarbeitet neue Frage die als JSON erhalten wurde
   * @param {*} data Frage als JSON formatiert
   */
  function handleAddQuestion(data) {
    setQuestions([...questions, data]);
    toast({
      title: "Frage hinzugefügt",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Wenn Validierung IO dann speichere in DB
   */
  const onSubmit = async (data) => {
    data = { ...data, questions: questions };
    console.log(data);
    // Wenn mindestens eine Frage vorhanden ist, dann speichere in DB
    if (questions.length > 0) {
      setLoaddingSaveQuiz(true);
      const result = await app.currentUser.functions.createQuiz(
        JSON.stringify(data)
      );
      console.log(result);
      // Prüfe ob speichern in DB erfolgreich
      if (result.success) {
        toast({
          title: "Quiz erfolgreich erstellt",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Fehler beim speichern.",
          description: result.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setLoaddingSaveQuiz(false);
    } else {
      toast({
        title: "Quiz konnte nicht erstellt werden!",
        description: "Es muss mindestens eine Frage vorhanden sein.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card border={"none"} variant={"outline"} maxW={"800px"}>
      <CardBody>
        <VStack gap={"2em"} w={"100%"} align={"start"}>
          <Box w={"100%"}>
            <HStack mb={"1em"} justify={"space-between"}>
              <Heading>Quiz erstellen</Heading>
              <Button
                onClick={handleSubmit(onSubmit)} // Hier ist die Verknüpfung!
                colorScheme="primary"
                leftIcon={loadingSaveQuiz ? <Spinner /> : <MdSave />}
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

          {questions.map((question, index) => {
            return (
              <CreatedQuestionCard
                key={index}
                question={question.question}
                answers={question.answers}
                correctAnswer={question.correctAnswer}
                hint={question.hint}
              />
            );
          })}

          <AddQuestionDrawer
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            handleAddQuestion={handleAddQuestion}
          />
        </VStack>
      </CardBody>
    </Card>
  );
}

export default Create;
