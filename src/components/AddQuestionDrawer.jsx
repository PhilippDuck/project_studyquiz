import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

/**
 * Drawer um Quizfrage einzugeben
 * @param {*} props
 * @returns Gibt Frage als JSON formatiert zurück
 */
function AddQuestionDrawer(props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    props.onClose();
    console.log(data);
    props.handleAddQuestion(data);
  };

  return (
    <Drawer
      size="sm"
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent overflowY={"auto"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerCloseButton />
          <DrawerHeader>Frage hinzufügen</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} margin="0 auto">
              <FormControl isInvalid={errors.question}>
                <FormLabel htmlFor="question">Frage</FormLabel>
                <Input
                  {...register("question", {
                    required: "Frage ist erforderlich",
                  })}
                  id="question"
                />
                <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
              </FormControl>

              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <FormControl
                    key={index}
                    isInvalid={errors.answers && errors.answers[index]}
                  >
                    <FormLabel htmlFor={`answers[${index}]`}>
                      Antwort {index + 1}
                    </FormLabel>
                    <Input
                      {...register(`answers.${index}`, {
                        required: "Antwort ist erforderlich",
                      })}
                      id={`answers[${index}]`}
                    />
                    <FormErrorMessage>
                      {errors.answers && errors.answers[index]?.message}
                    </FormErrorMessage>
                  </FormControl>
                ))}

              <FormControl isInvalid={errors.correctAnswer}>
                <FormLabel htmlFor="correctAnswer">Richtige Antwort</FormLabel>
                <Controller
                  render={({ field }) => (
                    <Select {...field} id="correctAnswer">
                      <option value="">Wählen Sie eine Option</option>
                      {Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <option value={index} key={index}>
                            Antwort {index + 1}
                          </option>
                        ))}
                    </Select>
                  )}
                  name="correctAnswer"
                  control={control}
                  rules={{ required: "Richtige Antwort auswählen" }}
                />
                <FormErrorMessage>
                  {errors.correctAnswer?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="hint">Hinweis</FormLabel>
                <Input {...register("hint")} id="hint" />
              </FormControl>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              mr={"2"}
              onClick={() => {
                reset();
                props.onClose();
              }}
            >
              Abbrechen
            </Button>
            <Button colorScheme="primary" type="submit">
              Frage hinzufügen
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default AddQuestionDrawer;
