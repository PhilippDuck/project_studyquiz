import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  ButtonGroup,
  Spinner,
} from "@chakra-ui/react";
import { MdOutlineDelete, MdOutlineDone } from "react-icons/md";

function ReportetQuestionCard({
  reportedQuestion,
  releaseQuestion,
  loadingRelease,
  deleteReportedQuestion,
  loadingDelete,
}) {
  return (
    <Card w={"100%"} variant={"outline"}>
      <CardBody>
        <Accordion allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text>{reportedQuestion.question.question}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Heading size={"xs"} mb={2}>
                Antworten:
              </Heading>
              {reportedQuestion.question.answers.map((answer, index) => {
                return (
                  <Text
                    key={index}
                    color={
                      index === Number(reportedQuestion.question.correctAnswer)
                        ? "green.500"
                        : "inherit"
                    }
                  >
                    {index + 1}. {answer}
                  </Text>
                );
              })}
              <Heading size={"xs"} mb={2} mt={2}>
                Hinweis:
              </Heading>
              <Text>{reportedQuestion.question.hint}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <ButtonGroup mt={4}>
          <Button
            onClick={() => deleteReportedQuestion(reportedQuestion.question.id)}
            leftIcon={
              loadingDelete ? <Spinner size={"sm"} /> : <MdOutlineDelete />
            }
            colorScheme="red"
          >
            Löschen
          </Button>
          <Button
            onClick={() => releaseQuestion(reportedQuestion.question.id)}
            leftIcon={
              loadingRelease ? <Spinner size={"sm"} /> : <MdOutlineDone />
            }
          >
            Freigeben
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

export default ReportetQuestionCard;
