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
