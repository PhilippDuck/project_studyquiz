import React from "react";
import { Center, Button, Text, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

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
