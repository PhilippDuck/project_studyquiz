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
} from "@chakra-ui/react";
import Erfahrungspunkte from "../components/Erfahrungspunkte";
import BWLQuizzes from "../components/BWLQuizzes";

function Highscores() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Card border={"none"} variant={"outline"} maxW={"800px"}>
      <CardBody>
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
                <BWLQuizzes />
              </TabPanel>
              <TabPanel>
                <p>Inhalt des Tab 3</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </CardBody>
    </Card>
  );
}

export default Highscores;
