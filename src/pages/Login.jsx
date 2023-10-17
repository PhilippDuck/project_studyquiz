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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdLogin } from "react-icons/md";
import Logo from "../components/Logo";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Hier können Sie den Login-Prozess implementieren
  };

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
