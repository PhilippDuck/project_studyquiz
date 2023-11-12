import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Textarea,
  VStack,
  Code,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { LuImport } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";

function ImportQuestionsModal({ importQuestionModal, handleAddQuestion }) {
  const exampleJson = `
        [{
          "question": "Welches SQL-Kommando wird verwendet, um Daten aus einer Tabelle abzurufen?",
          "answers": [
            "INSERT",
            "DELETE",
            "SELECT",
            "UPDATE"
          ],
          "hint": "Denk daran, welches Kommando du benutzt, wenn du Informationen aus einer Tabelle sehen möchtest!",
          "correctAnswer": "2"
        },{
          "question": "Welches SQL-Kommando wird verwendet, um Daten in einer Tabelle zu aktualisieren?",
          "answers": [
            "INSERT",
            "UPDATE",
            "SELECT",
            "DROP"
          ],
          "hint": "Denk daran, welches Kommando du verwendest, wenn du bestehende Daten in einer Tabelle ändern möchtest!",
          "correctAnswer": "1"
        }
        ]
      `;

  const toast = useToast();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    try {
      const parsedData = JSON.parse(data.jsonInput);
      handleAddQuestion(parsedData);
      importQuestionModal.onClose();
    } catch (e) {
      toast({
        title: "Fehler beim Parsen des JSON",
        description: e.message, // Zeigt die genaue Fehlermeldung an
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exampleJson);
      toast({
        title: "Kopiert!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Konnte nicht in die Zwischenablage kopieren.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={importQuestionModal.isOpen}
      onClose={importQuestionModal.onClose}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent m={2} overflowY="auto" maxH="80vh">
        <ModalHeader>Fragen importieren</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align={"start"}>
            <Text>
              Hier kannst du Fragen als JSON formatierten Text importieren. Dies
              kann sehr hilfreich sein, um maschinell erzeugte Fragen zu
              importieren.
            </Text>
            <Text>
              Es können beliebig viele Fragenobjekte mit "," (Komma) zwischen
              den Fragen (geschweifte Klammern) getrennt eingefügt werden.
              (siehe Beispiel)
            </Text>
            <Flex w={"100%"} justify={"space-between"} align={"center"}>
              <Text fontWeight={"semibold"}>Beispiel:</Text>{" "}
              <Button
                leftIcon={<MdContentCopy />}
                onClick={handleCopy}
                size="sm"
                variant={"outline"}
              >
                Kopieren
              </Button>
            </Flex>

            <pre
              style={{
                fontSize: "0.8em",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                width: "100%",
              }}
            >
              <Code h={"200px"} overflowY={"auto"} p={2}>
                {JSON.stringify(JSON.parse(exampleJson), null, 2)}
              </Code>
            </pre>

            <Text fontWeight={"semibold"}>JSON hier einfügen:</Text>
            <Controller
              name="jsonInput"
              control={control}
              defaultValue=""
              render={({ field }) => <Textarea {...field} />}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="primary"
            mr={3}
            leftIcon={<LuImport />}
            onClick={handleSubmit(onSubmit)}
          >
            importieren
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ImportQuestionsModal;
