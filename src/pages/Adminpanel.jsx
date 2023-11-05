import React from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRealm } from "../provider/RealmProvider";
import ReportetQuestionCard from "../components/ReportetQuestionCard";

function Adminpanel() {
  const app = useRealm();
  const toast = useToast();
  const [reportedQuestions, setReportedQuestions] = useState([]);
  const [loadingReportedQuestions, setLoadingReportedQuestions] =
    useState(false);
  const [loadingRelease, setLoadingRelease] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    getReportedQuestions();
  }, []);

  async function getReportedQuestions() {
    setLoadingReportedQuestions(true);
    try {
      const result = await app.currentUser.functions.getReportedQuestions();
      setReportedQuestions(result);
    } catch (error) {
      console.log(error);
    }
    setLoadingReportedQuestions(false);
  }

  async function releaseQuestion(questionId) {
    setLoadingRelease(true);
    try {
      const result =
        await app.currentUser.functions.releaseReportedQuestionById(questionId);
      console.log(result);

      if (result.status === "success") {
        setReportedQuestions((prevQuestions) =>
          prevQuestions.filter(
            (question) => question.question.id !== questionId
          )
        );
        toast({
          title: result.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingRelease(false);
  }

  async function deleteReportedQuestion(questionId) {
    setLoadingDelete(true);
    try {
      const result =
        await app.currentUser.functions.deleteReportedQuestionsById(questionId);
      console.log(result);

      if (result.status === "success") {
        setReportedQuestions((prevQuestions) =>
          prevQuestions.filter(
            (question) => question.question.id !== questionId
          )
        );
        toast({
          title: result.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingDelete(false);
  }

  return (
    <Container p={0} maxW={"800px"} variant={"outline"}>
      <Heading>Admin Bereich</Heading>
      <Heading mt={4} size={"md"}>
        Gemeldete Fragen:
      </Heading>
      <Box mt={4}>
        {loadingReportedQuestions ? (
          <Spinner />
        ) : (
          <VStack align={"start"}>
            {reportedQuestions.map((reportedQuestion, index) => {
              return (
                <ReportetQuestionCard
                  key={reportedQuestion._id}
                  reportedQuestion={reportedQuestion}
                  releaseQuestion={releaseQuestion}
                  loadingRelease={loadingRelease}
                  deleteReportedQuestion={deleteReportedQuestion}
                  loadingDelete={loadingDelete}
                />
              );
            })}
          </VStack>
        )}
      </Box>
    </Container>
  );
}

export default Adminpanel;
