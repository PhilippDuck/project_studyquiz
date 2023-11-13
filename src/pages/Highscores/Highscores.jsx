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
import Erfahrungspunkte from "./Components/Erfahrungspunkte";
import DatenbankenHighscore from "./Components/DatenbankenHighscore";
import PuUHighscore from "./Components/PuUHighscore";
import ProgrammiersprachenHighscore from "./Components/ProgrammiersprachenHighscore";

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
          <TabList
            mb={{ base: 4, md: 0 }} // Margin bottom responsive
            flexDirection={{ base: "column", md: "row" }} // Change flex direction based on screen size
          >
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
