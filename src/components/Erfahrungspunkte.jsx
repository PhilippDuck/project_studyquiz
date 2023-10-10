import React from "react";
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

function Erfahrungspunkte() {
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
            <Tr>
              <Td>Günther</Td>
              <Td>100</Td>
              <Td>1</Td>
            </Tr>
            <Tr>
              <Td>Rüdiger</Td>
              <Td>90</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>Jürgen</Td>
              <Td>80</Td>
              <Td>3</Td>
            </Tr>
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
