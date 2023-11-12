import React from "react";
import {
  Heading,
  Card,
  CardBody,
  Center,
  VStack,
  Button,
  useColorModeValue,
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import Logo from "../components/Logo";

/**
 * Die `ConfirmRegistration`-Komponente ermöglicht es Benutzern, ihre Registrierung zu bestätigen.
 * Sie wird typischerweise verwendet, nachdem ein Benutzer einen Registrierungslink in einer E-Mail angeklickt hat.
 * Die Komponente empfängt einen Token und einen TokenId aus der URL, die für die Bestätigung der Registrierung notwendig sind.
 *
 * @component
 * @example
 * return (
 *   <ConfirmRegistration />
 * )
 *
 * Funktion:
 * - `confirm`: Bestätigt die Benutzerregistrierung anhand des Tokens und der TokenId und leitet den Benutzer nach erfolgreicher Bestätigung zum Login-Bildschirm weiter.
 *
 * Zustände:
 * - `loadingConfirm`: Zeigt an, ob der Bestätigungsprozess läuft.
 *
 * Die Komponente nutzt die `useRealm`-Hook, um Zugang zur Authentifizierungsfunktionalität zu erhalten, und die `useToast`-Hook von Chakra UI, um Benachrichtigungen anzuzeigen.
 * Außerdem verwendet sie die `useNavigate`- und `useSearchParams`-Hooks von React Router DOM für die Navigation und das Auslesen der URL-Parameter.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling und beinhaltet die `Logo`-Komponente als visuelles Element.
 */
function ConfrimRegistration() {
  const app = useRealm();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const token = searchParams.get("token");
  const tokenId = searchParams.get("tokenId");

  async function confirm() {
    setLoadingConfirm(true);
    try {
      await app.emailPasswordAuth.confirmUser({ token, tokenId });
      toast({
        title: "Email bestätigt!",
        description: "Du kannst dich nun einloggen.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    setLoadingConfirm(false);
  }

  return (
    <Center h={"100vh"} bg={useColorModeValue("white", "gray.900")}>
      <VStack w={"600px"} p={4} gap={10}>
        <Logo w={"300px"} />
        <Card w={"100%"} variant={"outline"}>
          <CardBody>
            <VStack align={"start"}>
              <Heading>Registrierung bestätigen</Heading>
              <Text>
                Klicke auf den Button "Bestätigen" um Deine Registrierung
                abzuschließen. Anschließend wirst Du zum Login weitergeleitet.
              </Text>
              <Button
                onClick={() => confirm()}
                w={"100%"}
                mt={4}
                colorScheme="primary"
                size={"lg"}
                leftIcon={
                  loadingConfirm ? <Spinner size={"sm"} /> : <MdOutlineDone />
                }
              >
                Bestätigen
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
}

export default ConfrimRegistration;
