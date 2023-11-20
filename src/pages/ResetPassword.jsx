import React, { useState } from "react";
import {
  Heading,
  Card,
  CardBody,
  Center,
  VStack,
  Button,
  useColorModeValue,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";

/**
 * Die `ResetPassword`-Komponente ermöglicht es Benutzern, ihr Passwort zurückzusetzen.
 * Sie wird in der Regel verwendet, wenn ein Benutzer sein Passwort vergessen hat und über den Passwort-Zurücksetzungsprozess
 * eine E-Mail mit einem Link zum Zurücksetzen des Passworts erhalten hat. Die Komponente erfordert einen gültigen Token und TokenId,
 * die über die URL bereitgestellt werden, um das neue Passwort festzulegen.
 *
 * @component
 * @example
 * return (
 *   <ResetPassword />
 * )
 *
 * Funktion:
 * - `onSubmit`: Nimmt das neue Passwort entgegen und verarbeitet das Zurücksetzen des Passworts mithilfe des Authentifizierungsservice.
 *
 * Zustände:
 * - `loadingReset`: Zeigt an, ob der Prozess zum Zurücksetzen des Passworts aktiv ist.
 * - `showPassword`: Steuert die Sichtbarkeit des eingegebenen Passworts.
 *
 * Die Komponente nutzt die `useRealm`-Hook für die Authentifizierungsfunktionen, `useToast` von Chakra UI für Benachrichtigungen,
 * sowie `useNavigate` und `useSearchParams` von React Router DOM für die Navigation und das Auslesen der URL-Parameter.
 *
 * Zusätzliche Elemente:
 * - `FormControl`, `FormLabel`, `Input`, `FormErrorMessage`, `InputGroup`, `Button`: Für die Darstellung und Interaktion im Passwort-Zurücksetzungsformular.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling und beinhaltet die `Logo`-Komponente als visuelles Element.
 */
function ResetPassword() {
  const [searchParams] = useSearchParams();
  const app = useRealm();
  const navigate = useNavigate();
  const toast = useToast();
  const [loadingReset, setLoadingReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ newPassword }) => {
    setLoadingReset(true);
    const token = searchParams.get("token");
    const tokenId = searchParams.get("tokenId");

    if (!token || !tokenId) {
      toast({
        title: "Fehler",
        description: "Token oder Token-ID fehlt.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await app.emailPasswordAuth.resetPassword({
        password: newPassword,
        token,
        tokenId,
      });
      toast({
        title: "Passwort zurückgesetzt",
        description: "Ihr Passwort wurde erfolgreich zurückgesetzt.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/Login");
    } catch (error) {
      toast({
        title: "Fehler beim Zurücksetzen des Passworts",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingReset(false);
  };

  return (
    <Center h={"100vh"} bg={useColorModeValue("white", "gray.900")}>
      <VStack w={"600px"} p={4} gap={10}>
        <Logo w={"300px"} />
        <Card w={"100%"} variant={"outline"}>
          <CardBody>
            <VStack align={"stretch"} w={"100%"}>
              <Heading>Neues Passwort vergeben</Heading>
              <form onSubmit={handleSubmit(onSubmit)} w={"100%"}>
                <FormControl isInvalid={errors.newPassword} w={"100%"}>
                  <FormLabel htmlFor="newPassword">Neues Passwort</FormLabel>
                  <InputGroup>
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword", {
                        required: "Passwort ist erforderlich",
                        minLength: {
                          value: 8,
                          message:
                            "Das Passwort muss mindestens 8 Zeichen lang sein",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-\[\]{}()":;'/\\,.<>~_+=|#`^]).{8,}$/,
                          message:
                            "Das Passwort muss Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen (@$!%*?&-[]{}()\":;'/,.<>~_+=|#`^) enthalten",
                        },
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        mr={1}
                        variant={"link"}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Verbergen" : "Anzeigen"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.newPassword && errors.newPassword.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  leftIcon={loadingReset ? <Spinner size={"sm"} /> : <></>}
                  mt={4}
                  colorScheme="primary"
                  type="submit"
                  w={"100%"}
                >
                  Passwort zurücksetzen
                </Button>
              </form>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
}

export default ResetPassword;
