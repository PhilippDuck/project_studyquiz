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
} from "@chakra-ui/react";
import { useRealm } from "../../../provider/RealmProvider";

function DatenbankenHighscore() {
  const app = useRealm();
  const [userList, setUserList] = useState([]);
  const [playedQuizzes, setPlayedQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await app.currentUser.functions.getAllPlayedQuizzes();
        console.log(result);

        // Berechne die Zeitdifferenz für jedes Quiz
        const quizzesWithTime = result.map((quiz) => ({
          ...quiz,
          time: quiz.endTime - quiz.startTime,
        }));

        // Sortiere die Quizze nach der Zeitdifferenz (schnellste zu langsamste)
        quizzesWithTime.sort((a, b) => a.time - b.time);

        // Setze die sortierten Daten in den Zustand
        setUserList(quizzesWithTime);
        for (let i = 0; i < playedQuizzes.length; i++) {
          // Holen des playerNick basierend auf playerId
          const playerData = await userDataCollection.findOne({
            userId: playedQuizzes[i].playerId,
          });
          playedQuizzes[i].playerNick = playerData
            ? playerData.nickname
            : "Unbekannt";

          // Holen des quizTitle basierend auf quizId
          const quizData = await quizzesCollection.findOne({
            _id: BSON.ObjectId(playedQuizzes[i].quizId),
          });
          playedQuizzes[i].quizTitle = quizData
            ? quizData.title
            : "Unbekannter Titel";
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };
    fetchData();
  }, [app]);

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="primary">
          <TableCaption>Datenbanken Highscore</TableCaption>
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
    </div>
  );
}

export default DatenbankenHighscore;
