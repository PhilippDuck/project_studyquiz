import React, { useState } from "react";
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
} from "@chakra-ui/react";
import Erfahrungspunkte from "../components/Erfahrungspunkte";
import PlayedQuizzesByTime from "../components/PlayedQuizzesByTime";
import DatenbankenHighscore from "../components/DatenbankenHighscore";
import PuUHighscore from "../components/PuUHighscore";
import ProgrammiersprachenHighscore from "./ProgrammiersprachenHighscore";

function Highscores() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Container p={0} border={"none"} variant={"outline"} maxW={"800px"}>
      <Heading mb={4}>Ranglisten</Heading>
      <Box>
        <Tabs onChange={handleTabChange} isFitted variant="enclosed">
          <TabList>
            <Tab>Erfahrungspunkte</Tab>
            <Tab>Datenbanken</Tab>
            <Tab>Personal- und Unternehmensführung</Tab>
            <Tab>Programmiersprachen</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Erfahrungspunkte />
            </TabPanel>
            <TabPanel>
              <DatenbankenHighscore />
            </TabPanel>
            <TabPanel>
              <PuUHighscore />
            </TabPanel>
            <TabPanel>
              <ProgrammiersprachenHighscore />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Highscores;
