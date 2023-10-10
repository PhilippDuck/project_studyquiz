import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Container,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

function AddQuestionDrawer({ onClose, onOpen, isOpen }) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Frage hinzufügen</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Abbrechen
          </Button>
          <Button colorScheme="primary">Hinzufügen</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddQuestionDrawer;
