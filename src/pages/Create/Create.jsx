import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  useDisclosure,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Flex,
  Spacer,
  VStack,
  HStack,
  FormHelperText,
  useToast,
  Spinner,
  ButtonGroup,
  IconButton,
  Tooltip,
  Container,
} from "@chakra-ui/react";
import AddQuestionDrawer from "./Components/AddQuestionDrawer";
import { useForm } from "react-hook-form";
import { MdAdd, MdSave } from "react-icons/md";
import { LuImport } from "react-icons/lu";
import { useRealm } from "../../provider/RealmProvider";
import CreatedQuestionCard from "../../components/CreatedQuestionCard";
import { useNavigate } from "react-router-dom";
import ImportQuestionsModal from "./Components/ImportQuestionsModal";

/**
 * Die `Create`-Komponente dient dem Erstellen und Verwalten eines neuen Quiz.
 * Sie ermöglicht es dem Benutzer, verschiedene Fragen hinzuzufügen, ein Quiz-Thema auszuwählen
 * und das Quiz schließlich zu speichern.
 *
 * @component
 * @example
 * return (
 *   <Create />
 * )
 *
 * Funktionen:
 * - `getTopics`: Lädt die verfügbaren Quiz-Themen aus der Datenbank.
 * - `handleAddQuestion`: Fügt eine oder mehrere neue Fragen zum Quiz hinzu.
 * - `onSubmit`: Speichert das erstellte Quiz in der Datenbank.
 *
 * Zustände:
 * - `questions`: Enthält die aktuell zum Quiz hinzugefügten Fragen.
 * - `loadingSaveQuiz`: Zeigt an, ob das Quiz gerade gespeichert wird.
 * - `topics`: Liste der verfügbaren Themen für das Quiz.
 *
 * Zusätzliche Komponenten:
 * - `AddQuestionDrawer`: Eine Schublade zum Hinzufügen neuer Fragen.
 * - `ImportQuestionsModal`: Ein Modal zum Importieren von Fragen.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling und `react-hook-form` für das Formularmanagement.
 */
function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const importQuestionModal = useDisclosure();
  const toast = useToast();
  const [questions, setQuestions] = useState([]);
  const app = useRealm();
  const navigate = useNavigate();
  const [loadingSaveQuiz, setLoaddingSaveQuiz] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics();
  }, []);

  async function getTopics() {
    const result = await app.currentUser.functions.getTopics();
    setTopics(result);
    return result;
  }

  /**
   * Verarbeitet neue Frage(n) die als JSON erhalten wurde
   */
  function handleAddQuestion(data) {
    if (Array.isArray(data)) {
      // Wenn die Daten ein Array sind, dann füge das gesamte Array zu den Fragen hinzu.
      setQuestions([...questions, ...data]);
    } else {
      // Wenn die Daten ein einzelnes Objekt sind, dann füge nur dieses Objekt hinzu.
      setQuestions([...questions, data]);
    }
    toast({
      title: "Frage(n) hinzugefügt",
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
    data = {
      ...data,
      questions: questions,
      owner: app.currentUser.id,
      creationDate: Date.now(),
    };
    console.log(data);
    // Wenn mindestens eine Frage vorhanden ist, dann speichere in DB
    if (questions.length > 0) {
      setLoaddingSaveQuiz(true);
      try {
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
      } catch (error) {
        console.log(error);
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
    <Container p={0} border={"none"} variant={"outline"} maxW={"800px"}>
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
                {topics.map((topic) => {
                  return (
                    <option key={topic._id} value={topic.topic}>
                      {topic.topic}
                    </option>
                  );
                })}
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
          <ButtonGroup isAttached>
            <Tooltip label={"importieren"}>
              <IconButton
                icon={<LuImport />}
                variant={"outline"}
                onClick={() => {
                  importQuestionModal.onOpen();
                }}
              ></IconButton>
            </Tooltip>
            <Button leftIcon={<MdAdd />} variant={"outline"} onClick={onOpen}>
              Frage hinzufügen
            </Button>
          </ButtonGroup>
        </Flex>

        {questions.map((question, index) => {
          return <CreatedQuestionCard key={index} question={question} />;
        })}

        <AddQuestionDrawer
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          handleAddQuestion={handleAddQuestion}
        />
      </VStack>
      <ImportQuestionsModal
        handleAddQuestion={handleAddQuestion}
        importQuestionModal={importQuestionModal}
      />
    </Container>
  );
}

export default Create;
