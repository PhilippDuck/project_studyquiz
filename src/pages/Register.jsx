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
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRealm } from "../provider/RealmProvider";
import { MdArrowBack, MdLogin } from "react-icons/md";
import { LuSmile } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import Logo from "../components/Logo";
import { useState } from "react";

function Register() {
  const app = useRealm();
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [confirmationSend, setConfirmationSend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Ruft beim Submit die Funktion zum Registrieren mit email und passwort auf
   * und prüft die Response
   * @param {{email:String, password:String}} data
   */
  const onSubmit = async (data) => {
    setLoadingRegister(true);
    setEmail(data.email.toLocaleLowerCase());
    try {
      // Beachten Sie die Verwendung von Schlüssel-Wert-Paaren im Objekt
      const result = await app.emailPasswordAuth.registerUser({
        email: data.email.toLowerCase(),
        password: data.password,
      });
      console.log(result);
      toast({
        title: "Bestätigungsmail wurde versandt!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setConfirmationSend(true);
    } catch (error) {
      let errorMessage = "Ein unbekannter Fehler ist aufgetreten.";
      if (
        error.message.includes("name already in use") &&
        error.statusCode === 409
      ) {
        errorMessage = "Diese E-Mail-Adresse wird bereits verwendet.";
      }
      // Möglicherweise möchten Sie auch andere Fehlercodes abfangen und entsprechende Nachrichten definieren

      toast({
        title: "Fehler beim Registrieren!",
        description: errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setLoadingRegister(false);
  };

  async function sendConfirmationAgain(email) {
    try {
      await app.emailPasswordAuth.resendConfirmationEmail({ email });
      toast({
        title: "Weitere Bestätigungsmail versand!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center h={"100vh"} bg={useColorModeValue("white", "gray.900")}>
      <VStack w={"600px"} p={4} gap={10}>
        <Logo w={"300px"} />
        <Card w={"100%"} variant={"outline"}>
          <CardBody>
            <Heading>Registrieren</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack pt={4} align={"start"}>
                <FormControl isInvalid={errors.email}>
                  <Text>Email:</Text>
                  <Input
                    {...register("email", {
                      required: "E-Mail ist erforderlich",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Ungültige E-Mail-Adresse",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <Text>Passwort:</Text>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Passwort ist erforderlich",
                      minLength: {
                        value: 8,
                        message:
                          "Das Passwort muss mindestens 8 Zeichen lang sein",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Das Passwort muss Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                {confirmationSend ? (
                  <Center mt={2} w={"100%"}>
                    <VStack>
                      <Text>
                        Schaue in deinem Email Postfach nach der
                        Bestätigungsmail und bestätige Diese.
                      </Text>
                      <Button
                        onClick={() => sendConfirmationAgain(email)}
                        rightIcon={<BsArrowRepeat />}
                        variant={"ghost"}
                      >
                        Bestätigungsmail erneut senden
                      </Button>
                    </VStack>
                  </Center>
                ) : (
                  <></>
                )}

                <Button
                  leftIcon={
                    loadingRegister ? <Spinner size={"sm"} /> : <LuSmile />
                  }
                  size={"lg"}
                  w={"100%"}
                  mt={6}
                  colorScheme="primary"
                  type="submit"
                >
                  Registrieren
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
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
}

export default Register;
