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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Ruft beim Submit die Funktion zum einloggen mit email und passwort auf
   * und prüft die Response
   * @param {{email:String, password:String}} data
   */
  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const user = await loginEmailPassword(data.email, data.password);
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
        description: error.message,
        status: "error",
        duration: 3000,
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

  return (
    <Center h={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <VStack w={"600px"} p={4} gap={10}>
        <Logo w={"300px"} />
        <Card w={"100%"} variant={"outline"}>
          <CardBody>
            <Heading>Login</Heading>
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
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
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
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
}

export default Login;
