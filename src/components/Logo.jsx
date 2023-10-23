import React from "react";
import { Image, Box, useColorModeValue } from "@chakra-ui/react";

function Logo(props) {
  return (
    <Box w={props.w}>
      <Image
        src={useColorModeValue(
          "/StudyQuiz_Banner_Schwarz_Transparent.png",
          "/StudyQuiz_Banner_Weiss_Transparent.png"
        )}
      />
    </Box>
  );
}

export default Logo;
