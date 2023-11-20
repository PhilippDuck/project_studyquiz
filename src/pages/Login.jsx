import React from "react";
import {
  Heading,
  Card,
  CardBody,
  Center,
  Input,
  VStack,
  Text,
  Button,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRealm } from "../provider/RealmProvider";
import { MdArrowBack, MdLogin } from "react-icons/md";
import Logo from "../components/Logo";
import { Credentials } from "realm-web";
import { useState } from "react";

/**
 * Die `Login`-Komponente ermöglicht es Benutzern, sich in die Anwendung einzuloggen.
 * Sie bietet auch eine Möglichkeit, das Passwort zurückzusetzen, falls der Benutzer es vergessen hat.
 * Die Komponente nutzt Formulare zur Eingabe von Benutzerdaten und interagiert mit einem Authentifizierungsservice, um die Anmeldeinformationen zu validieren.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 *
 * Funktionen:
 * - `onSubmit`: Verarbeitet das Login-Formular und versucht, den Benutzer einzuloggen.
 * - `loginEmailPassword`: Sendet die Anmeldeinformationen an den Authentifizierungsservice.
 * - `onResetPassword`: Verarbeitet das Formular zum Zurücksetzen des Passworts und sendet eine Anfrage an den Authentifizierungsservice.
 *
 * Zustände:
 * - `loadingReset`: Zeigt an, ob der Prozess des Zurücksetzens des Passworts läuft.
 *
 * Die Komponente nutzt die `useRealm`-Hook für die Authentifizierungsfunktionen, `useToast` von Chakra UI für Benachrichtigungen,
 * sowie `useNavigate` und `useDisclosure` von React Router DOM und Chakra UI für die Navigation und die Steuerung der Modalansicht.
 *
 * Zusätzliche Elemente:
 * - `Modal`: Ein Dialogfenster zur Eingabe der E-Mail-Adresse für das Zurücksetzen des Passworts.
 * - `FormControl` und `FormErrorMessage`: Zur Anzeige und Validierung der Formulareingaben.
 *
 * Die Komponente verwendet Chakra UI für das Layout und das Styling und beinhaltet die `Logo`-Komponente als visuelles Element.
 */
function Login() {
  const app = useRealm();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingReset, setLoadingReset] = useState(false);
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm();

  /**
   * Ruft beim Submit die Funktion zum einloggen mit email und passwort auf
   * und prüft die Response
   * @param {{email:String, password:String}} data
   */
  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const user = await loginEmailPassword(
        data.email.toLowerCase(),
        data.password
      );
      console.log(user);
      toast({
        title: "Erfolgreich eingeloggt!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Fehler beim einloggen!",
        description: "E-Mail und/oder Passwort nicht korrekt.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  /**
   * Login für einen Nutzer mit Email und Password
   * @param {String} email
   * @param {String} password
   * @returns User Object
   */
  async function loginEmailPassword(email, password) {
    // Create an email/password credential
    const credentials = Credentials.emailPassword(email, password);
    // Authenticate the user
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    return user;
  }

  const onResetPassword = async (data) => {
    setLoadingReset(true);
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({
        email: data.resetEmail.toLowerCase(),
      });
      toast({
        title: "Passwort-Reset E-Mail gesendet!",
        description: "Überprüfen Sie Ihren Posteingang.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Fehler beim Senden der E-Mail!",
        description: "Bitte versuchen Sie es erneut.",
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
            <Heading>Login</Heading>
            <form onSubmit={handleSubmitLogin(onSubmit)}>
              <VStack pt={4} align={"start"}>
                <FormControl isInvalid={loginErrors.email}>
                  <Text>Email:</Text>
                  <Input
                    {...registerLogin("email", {
                      required: "E-Mail ist erforderlich",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Ungültige E-Mail-Adresse",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {loginErrors.email && loginErrors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={loginErrors.password}>
                  <Text>Passwort:</Text>
                  <Input
                    type="password"
                    {...registerLogin("password", {
                      required: "Passwort ist erforderlich",
                    })}
                  />
                  <FormErrorMessage>
                    {loginErrors.password && loginErrors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  leftIcon={<MdLogin />}
                  size={"lg"}
                  w={"100%"}
                  mt={6}
                  colorScheme="primary"
                  type="submit"
                >
                  Einloggen
                </Button>

                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  size={"lg"}
                  w={"100%"}
                  leftIcon={<MdArrowBack />}
                >
                  Zurück zur App
                </Button>
                <Flex mt={6} w={"100%"} justify={"space-between"}>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    onClick={() => navigate("/register")}
                  >
                    Noch kein Account?
                  </Button>

                  <Button size={"sm"} onClick={onOpen} variant="link">
                    Passwort vergessen?
                  </Button>
                </Flex>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>

      {/* Modal für Passwort-Reset */}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Passwort zurücksetzen</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitReset(onResetPassword)}>
            <ModalBody>
              <FormControl isInvalid={resetErrors.resetEmail}>
                <Input
                  placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                  {...registerReset("resetEmail", {
                    required: "E-Mail ist erforderlich",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Ungültige E-Mail-Adresse",
                    },
                  })}
                />
                <FormErrorMessage>
                  {resetErrors.resetEmail && resetErrors.resetEmail.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                leftIcon={loadingReset ? <Spinner size={"sm"} /> : <></>}
                colorScheme="primary"
                type="submit"
              >
                Zurücksetzen
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default Login;
