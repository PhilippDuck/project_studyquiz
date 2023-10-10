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
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

/**
 * Rangliste der schnellsten BWL-Quiz Lösungen
 * @returns {}
 *
 */

function BWLQuizzes() {
  const [selectedFilter, setSelectedFilter] = useState("Alle");
  // quizOptions sind die Auswahlmöglichkeiten für die Anzeige von Ergebnissen einzelner Quizze ber der Bestenliste der BWL Quizze
  const [quizOptions, setQuizOptions] = useState([]);

  useEffect(() => {
    //
    // TODO Datenbankanbindung
    const databaseOptions = [
      "Alle",
      "Porsche-Modelle am Klang erkennen",
      "Grundlagen I",
      "Statistik",
    ];

    setQuizOptions(databaseOptions);
  }, []);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  //
  // TODO Datenbankanbindung
  const data = [
    {
      _id: 1,
      Name: "BWL-Justus",
      Quiz: "Porsche-Modelle am Klang erkennen",
      Zeit: "10:00",
      Rang: 1,
    },
    {
      _id: 2,
      Name: "Hinz",
      Quiz: "Grundlagen I",
      Zeit: "12:00",
      Rang: 2,
    },
    {
      _id: 3,
      Name: "Kunz",
      Quiz: "Statistik",
      Zeit: "13:00",
      Rang: 3,
    },
  ];

  return (
    <div>
      {/* Tabelle für die Anzeige der Bestenliste*/}
      <TableContainer>
        <Table variant="striped" colorScheme="primary">
          <TableCaption>BWL-Quizze</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              {/* Spalte für die Anzeige, in welchem Quiz im speziellen aus dem Bereich BWL die jeweilige Bestzeit stammt.
              Mit Button mit Filterfunktion um die Anzeige bestimmter Quiz zu filtern */}
              <Th>
                Quiz
                <Menu>
                  <MenuButton as={Button}>
                    <img
                      src="/images/Filter.png"
                      alt="Filter"
                      style={{ width: "20px", height: "20px" }}
                    />{" "}
                  </MenuButton>

                  <MenuList>
                    {/*  */}
                    {quizOptions.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => setSelectedFilter(option)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Th>
              <Th>Zeit</Th>
              <Th>Rang</Th>
            </Tr>
          </Thead>
          {/* Es folgt die eigentliche Tabelle data sind die Daten, die in der Bestenliste angezeigt werden. 
          Derzeit noch als Platzhalter mit Beispieldaten befüllt. */}
          <Tbody>
            {data
              .filter((item) =>
                selectedFilter === "Alle" ? true : item.Quiz === selectedFilter
              )
              .map((item) => (
                <Tr key={item._id}>
                  <Td>{item.Name}</Td>
                  <Td>{item.Quiz}</Td>
                  <Td>{item.Zeit}</Td>
                  <Td>{item.Rang}</Td>
                </Tr>
              ))}
          </Tbody>
          {/* Tabellenfuß beinhaltet noch einmal die Bezeichnungen der Spalten inklusive Filter bei Spalte Quiz */}
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>
                Quiz
                <Menu>
                  <MenuButton as={Button}>
                    <img
                      src="/images/Filter.png"
                      alt="Filter"
                      style={{ width: "20px", height: "20px" }}
                    />{" "}
                  </MenuButton>
                  <MenuList>
                    {quizOptions.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => setSelectedFilter(option)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Th>
              <Th>Zeit</Th>
              <Th>Rang</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BWLQuizzes;
