import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useRealm } from "../../../provider/RealmProvider";

const Bestenliste = ({ topic }) => {
  const app = useRealm();
  const [userList, setUserList] = useState([]);
  const [playedQuizzes, setPlayedQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await app.currentUser.functions.getAllPlayedQuizzes();
        const allQuizzes = await app.currentUser.functions.getQuizzes();

        // Filtern der gespielten Quizze nach dem Thema "Programmiersprachen"
        const filteredQuizzes = result.filter((quiz) => {
          const quizTopic = quiz.topic || "Unbekanntes Thema";
          return quizTopic;
        });

        const quizzesWithTime = filteredQuizzes.map((quiz) => ({
          ...quiz,
          time: quiz.endTime - quiz.startTime,
        }));

        // Sortieren der Quizze nach Zeitdifferenz (schnellste zu langsamste)
        quizzesWithTime.sort((a, b) => a.time - b.time);

        // Setzen der sortierten Daten in den Zustand
        setUserList(quizzesWithTime);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [app]);

  return (
    <div>
      {isLoading ? ( // Wenn isLoading true ist, zeige den Spinner
        <Box>
          Daten werden geladen. Danke für deine Geduld.
          <Spinner size="lg" />
        </Box>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="primary">
            <TableCaption>{topic} Highscore</TableCaption>
            <Thead>
              <Tr>
                <Th>Player</Th>
                <Th>Quiz</Th>
                <Th>Zeit</Th>
                <Th>Rang</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList.map((user, index) => (
                <Tr key={user._id}>
                  <Td>{user.playerNick}</Td>
                  <Td>{user.quizTitle}</Td>
                  <Td>{user.time} ms</Td>
                  <Td>{index + 1}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Player</Th>
                <Th>Quiz</Th>
                <Th>Zeit</Th>
                <Th>Rang</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Bestenliste;
