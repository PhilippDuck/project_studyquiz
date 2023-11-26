import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import userGuide from "../userGuide";

function UserGuideModal(props) {
  const [userGuideText, setUserGuideText] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Pfad extrahieren und prüfen, ob es ein Spiel-ID-Pfad ist
    const path = location.pathname;
    const isGamePath =
      path.startsWith("/games/") && path.split("/").length === 3;
    const userGuideKey = isGamePath ? "/games/id" : path;

    setUserGuideText(
      userGuide[userGuideKey] || "Keine Hilfe verfügbar für diesen Pfad."
    );
  }, [location.pathname, props.userGuide.isOpen]);

  return (
    <Modal
      isCentered
      isOpen={props.userGuide.isOpen}
      onClose={props.userGuide.onClose}
    >
      <ModalOverlay />
      <ModalContent m={2}>
        <ModalHeader>Hilfe {}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{userGuideText}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              window.open("/Benutzerhandbuch.pdf", "_blank");
            }}
            variant={"link"}
          >
            Vollständiges Benutzerhandbuch
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserGuideModal;
