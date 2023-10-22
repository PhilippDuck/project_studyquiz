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
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";

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
    <Box border={"none"} variant={"outline"} maxW={"800px"}>
      <Heading>Profil</Heading>
      {app.currentUser.customData.nickname ? (
        <Text>{app.currentUser.customData.nickname}</Text>
      ) : (
        <Text>NONAME</Text>
      )}

      {app.currentUser.providerType != "anon-user" && (
        <Button
          ref={btnRef}
          colorScheme="primary"
          onClick={() => setIsOpen(true)}
        >
          Nickname ändern
        </Button>
      )}

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

      <Text>{app.currentUser.id}</Text>
      <Text>Anmeldemethode: {app.currentUser.providerType}</Text>
    </Box>
  );
}

export default Profil;
