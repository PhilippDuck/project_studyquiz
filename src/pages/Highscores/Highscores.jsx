import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Heading,
  Container,
  Spinner,
} from "@chakra-ui/react";
import app from "../../realm";
import { useRealm } from "../../provider/RealmProvider";
import Bestenliste from "./Components/Bestenliste";
import Erfahrungspunkte from "./Components/Erfahrungspunkte";

function Highscores() {
  const app = useRealm();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
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
      <Heading mb={4}>Ranglisten</Heading>{" "}
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Box>
          <Tabs onChange={handleTabChange} isFitted variant="enclosed">
            <TabList
              mb={{ base: 4, md: 0 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Tab key="erfahrungspunkte">Erfahrungspunkte</Tab>
              {topics.map((topic) => (
                <Tab key={topic._id}>{topic.topic}</Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Erfahrungspunkte />
              </TabPanel>
              {topics.map((topic) => (
                <TabPanel key={topic._id}>
                  <Bestenliste topic={topic.topic} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Container>
  );
}

export default Highscores;
