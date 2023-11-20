import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Container,
  Spinner,
  Select, // Importieren der Select-Komponente
} from "@chakra-ui/react";
import { useRealm } from "../../provider/RealmProvider";
import Bestenliste from "./Components/Bestenliste";
import Erfahrungspunkte from "./Components/Erfahrungspunkte";

function Highscores() {
  const app = useRealm();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event) => {
    setSelectedTab(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // Simuliere den Datenabruf
        const result = await app.currentUser.functions.getTopics();

        setTopics(result);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container p={0} border={"none"} variant={"outline"} maxW={"800px"}>
      <Heading mb={4}>Ranglisten</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <Select
            onChange={handleTabChange}
            placeholder="Wählen Sie eine Kategorie"
            mb={4}
            size={"lg"}
          >
            <option value={0}>Top 10 Spieler</option>
            {topics.map((topic, index) => (
              <option key={topic._id} value={index + 1}>
                {topic.topic}
              </option>
            ))}
          </Select>

          {selectedTab === 0 ? (
            <Erfahrungspunkte />
          ) : (
            topics.map(
              (topic, index) =>
                selectedTab === index + 1 && (
                  <Bestenliste key={topic._id} topic={topic.topic} />
                )
            )
          )}
        </Box>
      )}
    </Container>
  );
}

export default Highscores;
