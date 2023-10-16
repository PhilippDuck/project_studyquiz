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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdLogin } from "react-icons/md";

function Login() {
  const navigate = useNavigate();
  // TODO StudyQuiz Logo einbinden
  return (
    <Center h={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Card variant={"outline"} w={"lg"} m={4}>
        <CardBody>
          <Heading>Login</Heading>
          <VStack pt={4} align={"start"}>
            <Text>Email:</Text>
            <Input></Input>
            <Text>Passwort:</Text>
            <Input></Input>

            <Button
              leftIcon={<MdLogin />}
              size={"lg"}
              w={"100%"}
              mt={6}
              colorScheme="primary"
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
        </CardBody>
      </Card>
    </Center>
  );
}

export default Login;
