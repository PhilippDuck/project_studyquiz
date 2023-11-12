import React from "react";
import PlayedQuizzes from "./Components/PlayedQuizzes";
import { Container } from "@chakra-ui/react";

/**
 * Die `Log`-Komponente dient als Container für die Anzeige der von einem Benutzer gespielten Quizspiele.
 * Sie nutzt die `PlayedQuizzes`-Komponente, um die Liste der gespielten Quizspiele anzuzeigen.
 *
 * @component
 * @example
 * return (
 *   <Log />
 * )
 *
 * Die Komponente hat keine eigene Logik oder Zustände und dient lediglich als struktureller Container für `PlayedQuizzes`.
 *
 * Zusätzliche Komponenten:
 * - `PlayedQuizzes`: Eine Unter-Komponente, die die Details der vom Benutzer gespielten Quizspiele anzeigt.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling.
 */
function Log() {
  return (
    <Container p={0} variant={"outline"} border={"none"} maxW={"800px"}>
      <PlayedQuizzes />
    </Container>
  );
}

export default Log;
