import React from "react";
import { useState, useEffect } from "react";
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
import { useRealm } from "../provider/RealmProvider";

function Erfahrungspunkte() {
  const app = useRealm();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Rufe die getUsersData-Funktion von MongoDB Realm auf
    const fetchData = async () => {
      try {
        const result = await app.currentUser.functions.getUsersData();
        // Hier könntest du die result-Daten, die du von MongoDB Realm erhältst, in userLists setzen
        setUserList(result);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };
    fetchData();
  }, [app]);

  const sortedUserList = [...userList].sort((a, b) => b.points - a.points);

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="primary">
          <TableCaption>Gesamtrangliste nach Erfahrungspunkten</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Punkte</Th>
              <Th>Rang</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedUserList.map((user, index) => (
              <Tr key={user._id}>
                <Td>{user.nickname}</Td>
                <Td>{user.points}</Td>
                <Td>{index + 1}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Punkte</Th>
              <Th>Rang</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Erfahrungspunkte;
