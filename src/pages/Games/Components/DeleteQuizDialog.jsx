import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function DeleteQuizDialog({ isOpen, onClose, deleteQuizById, quizIdToDelete }) {
  return (
    <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent m={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Quiz löschen
          </AlertDialogHeader>
          <AlertDialogBody>
            Sind Sie sicher, dass Sie dieses Quiz löschen möchten?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Abbrechen</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteQuizById(quizIdToDelete);
                onClose();
              }}
              ml={3}
            >
              Löschen
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteQuizDialog;
