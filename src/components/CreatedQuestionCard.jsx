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
} from "@chakra-ui/react";
import { GoReport } from "react-icons/go";

/**
 * Komponente stellt eine erstellte Frage dar
 */
function CreatedQuestionCard({
  question,
  answers,
  correctAnswer,
  hint,
  reportPossible,
  colorscheme: colorscheme,
}) {
  return (
    <Card
      variant={"outline"}
      w={"100%"}
      border={"2px"}
      borderColor={colorscheme}
    >
      <CardBody colorScheme={colorscheme}>
        <Accordion allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text>{question}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Heading size={"xs"} mb={2}>
                Antworten:
              </Heading>
              {answers.map((answer, index) => {
                return (
                  <Text
                    key={index}
                    color={
                      index === Number(correctAnswer) ? "green.500" : "inherit"
                    }
                  >
                    {index + 1}. {answer}
                  </Text>
                );
              })}
              <Heading size={"xs"} mb={2} mt={2}>
                Hinweis:
              </Heading>
              <Text>{hint}</Text>
              {reportPossible && (
                <Button
                  isDisabled
                  leftIcon={<GoReport />}
                  mt={4}
                  variant={"outline"}
                >
                  Frage melden
                </Button>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}

export default CreatedQuestionCard;
