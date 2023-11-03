import React from "react";
import PlayedQuizzes from "../components/PlayedQuizzes";
import { Container } from "@chakra-ui/react";

function Log() {
  return (
    <Container p={0} variant={"outline"} border={"none"} maxW={"800px"}>
      <PlayedQuizzes />
    </Container>
  );
}

export default Log;
