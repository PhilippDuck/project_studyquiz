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
  Spinner,
} from "@chakra-ui/react";
import { useRealm } from "../../../provider/RealmProvider";

function Erfahrungspunkte() {
  const app = useRealm();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Rufe die getUsersData-Funktion von MongoDB Realm auf
    const fetchData = async () => {
      try {
        const result = await app.currentUser.functions.getUsersData();
        // Hier könntest du die result-Daten, die du von MongoDB Realm erhältst, in userLists setzen
        setUserList(result);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [app]);

  const userListWithPoints = userList.filter(
    (user) => user.points !== undefined
  );

  const sortedUserList = [...userListWithPoints].sort(
    (a, b) => b.points - a.points
  );

  console.log(sortedUserList);

  return (
    <div>
      {isLoading ? ( // Wenn isLoading true ist, zeige den Spinner
        <Spinner size="xl" />
      ) : (
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
      )}
    </div>
  );
}

export default Erfahrungspunkte;
