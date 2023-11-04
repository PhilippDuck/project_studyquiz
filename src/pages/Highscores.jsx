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
            <Tab>Gesamt</Tab>
            <Tab>BWL-Quizzes</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Erfahrungspunkte />
            </TabPanel>
            <TabPanel>
              <PlayedQuizzesByTime />
            </TabPanel>
            <TabPanel>
              <p>Inhalt des Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Highscores;
