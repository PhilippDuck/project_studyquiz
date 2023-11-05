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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRealm } from "../provider/RealmProvider";
import { MdArrowBack, MdLogin } from "react-icons/md";
import Logo from "../components/Logo";
import { Credentials } from "realm-web";

function Login() {
  const app = useRealm();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({
        email: data.resetEmail,
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

                <Button onClick={onOpen} variant="link" mt={4}>
                  Passwort vergessen?
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
      {/* Modal für Passwort-Reset */}
      {/* Modal für Passwort-Reset */}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
              <Button colorScheme="primary" type="submit">
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
