import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
  Flex,
  IconButton,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

function Profil() {
  const toast = useToast();

  const navigate = useNavigate();
  const app = useRealm();
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => setIsOpen(false);
  const btnRef = React.useRef();

  const handleNicknameChange = async () => {
    setIsLoading(true);
    try {
      const result = await app.currentUser.functions.setNickname({
        userId: app.currentUser.id,
        nickname: nickname,
      });

      if (result.success) {
        toast({
          title: "Erfolg",
          description: result.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        await app.currentUser.refreshCustomData();
        setNickname(app.currentUser.customData.nickname);
        navigate("/profil");
        onClose(); // Nur schließen, wenn die Operation erfolgreich war
      } else {
        toast({
          title: "Fehler",
          description: result.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Fehler beim Setzen des Nicknames:", error.message);
      toast({
        title: "Fehler",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    // Hier wird `onClose()` nicht aufgerufen, damit der Drawer offen bleibt.
  };

  useEffect(() => {
    console.log(app.currentUser.customData);
  }, []);

  return (
    <Container border={"none"} variant={"outline"} maxW={"800px"}>
      <Heading mb={4}>Profil</Heading>
      <VStack gap={4} align={"start"}>
        <Box>
          <Text fontWeight={"bold"}>Nickname:</Text>
          <Flex align={"center"}>
            {app.currentUser.customData.nickname ? (
              <Text>{app.currentUser.customData.nickname}</Text>
            ) : (
              <Text>NONAME</Text>
            )}
            {app.currentUser.providerType != "anon-user" && (
              <IconButton
                size={"sm"}
                icon={<MdEdit />}
                ref={btnRef}
                variant={"ghost"}
                onClick={() => setIsOpen(true)}
              ></IconButton>
            )}
          </Flex>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>Benutzer-ID:</Text>
          <Text>{app.currentUser.id}</Text>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>Anmeldemethode:</Text>
          <Text> {app.currentUser.providerType}</Text>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>Gesamtpunkte:</Text>
          <Text>
            {app.currentUser.customData.points &&
            app.currentUser.customData.points.$numberInt !== undefined
              ? app.currentUser.customData.points.$numberInt
              : "noch keine Punkte 😱 !"}
          </Text>
        </Box>
      </VStack>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Nickname ändern</DrawerHeader>
            <DrawerBody>
              <Input
                placeholder="Neuer Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button
                mt={4}
                colorScheme="primary"
                onClick={handleNicknameChange}
                leftIcon={isLoading ? <Spinner /> : null}
              >
                Speichern
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Container>
  );
}

export default Profil;
