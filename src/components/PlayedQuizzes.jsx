import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Card,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import formatUnixTimestamp from "../helperFunctions/formatUnixTimestamp";

function PlayedQuizzes() {
  const app = useRealm();
  const [playedQuizzes, setPlayedQuizzes] = useState([]);
  const [loadingPlayedGames, setLoadingPlayedGames] = useState(false);

  useEffect(() => {
    getLastPlayedQuizzes();
  }, []);

  async function getLastPlayedQuizzes() {
    setLoadingPlayedGames(true);
    try {
      const result = await app.currentUser.functions.getPlayedQuizzes();
      //console.log(result);
      setPlayedQuizzes(result);
    } catch (error) {
      console.log(error);
    }
    setLoadingPlayedGames(false);
  }

  return (
    <Box mt={4} w={"100%"}>
      <Heading size={"md"}>Letzte Spiele:</Heading>
      {loadingPlayedGames ? (
        <Spinner />
      ) : (
        <VStack gap={3} mt={6} align={"start"} w={"100%"}>
          {playedQuizzes.map((playedQuiz) => {
            return (
              <Card
                p={3}
                key={playedQuiz._id}
                variant={"outline"}
                border={"none"}
                bg={useColorModeValue("gray.50", "gray.700")}
                w={"100%"}
              >
                <Text fontSize={"xs"}>
                  {formatUnixTimestamp(playedQuiz.endTime)} Uhr
                </Text>
                <Text
                  color={useColorModeValue("gray.500", "gray.200")}
                  fontSize={"xs"}
                >
                  <b>{playedQuiz.playerNick}</b> hat das Quiz{" "}
                  <b>{playedQuiz.quizTitle}</b> mit{" "}
                  <b>{playedQuiz.points} Punkten</b> in{" "}
                  <b>
                    {(playedQuiz.endTime - playedQuiz.startTime) / 1000}{" "}
                    Sekunden
                  </b>{" "}
                  beendet.
                </Text>
              </Card>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}

export default PlayedQuizzes;
