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
  Text,
} from "@chakra-ui/react";
import { useRealm } from "../../../provider/RealmProvider";

const Bestenliste = ({ topic }) => {
  const app = useRealm();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await app.currentUser.functions.getPlayedQuizzesByTopic({
        topic: topic,
      });
      console.log(topic, result);
      setUserList(result);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="primary">
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
                  <Td>{(user.endTime - user.startTime) / 1000} s</Td>
                  <Td>{index + 1}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Bestenliste;
