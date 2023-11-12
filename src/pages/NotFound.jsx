import React from "react";
import { Center, Button, Text, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

/**
 * Die `NotFound`-Komponente wird angezeigt, wenn ein Benutzer eine URL aufruft, die in der Anwendung nicht existiert.
 * Sie bietet eine Benutzeroberfläche zur Information des Benutzers, dass die angeforderte Seite nicht gefunden wurde (Fehler 404),
 * und eine Möglichkeit zur Rückkehr zur Startseite der Anwendung.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 *
 * Diese Komponente enthält keine eigene Logik oder Zustände und dient lediglich der Anzeige einer Fehlermeldung und eines Buttons zur Navigation.
 * Sie nutzt den `useNavigate`-Hook von React Router DOM, um die Navigation zur Startseite zu ermöglichen.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling.
 */

function NotFound() {
  const navigate = useNavigate();
  return (
    <Center h={"100vh"}>
      <VStack gap={3}>
        <Heading>Oooops!</Heading>
        <Text>404 - Seite nicht gefunden.</Text>
        <Button
          leftIcon={<MdArrowBack />}
          onClick={() => {
            navigate("/");
          }}
          colorScheme="primary"
        >
          Zurück zur App
        </Button>
      </VStack>
    </Center>
  );
}

export default NotFound;
