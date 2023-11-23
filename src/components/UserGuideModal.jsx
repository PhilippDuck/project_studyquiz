import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function UserGuideModal(props) {
  return (
    <Modal
      isCentered
      isOpen={props.userGuide.isOpen}
      onClose={props.userGuide.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hilfe</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Hier könnte deine Hilfe stehen :)</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="primary"
            mr={3}
            onClick={props.userGuide.onClose}
          >
            Schließen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserGuideModal;
