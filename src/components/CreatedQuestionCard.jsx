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
} from "@chakra-ui/react";

function CreatedQuestionCard({ question, answers, correctAnswer, hint }) {
  return (
    <Card variant={"outline"} w={"100%"}>
      <CardBody>
        <Accordion allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size={"md"}>{question}</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              Fragen:
              {answers.map((answer, index) => {
                return (
                  <Text
                    color={index === correctAnswer ? "green.500" : "inherit"}
                  >
                    {answer}
                  </Text>
                );
              })}
              <Text>Hinweis: {hint}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}

export default CreatedQuestionCard;