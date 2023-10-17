import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";

function Profil() {
  const app = useRealm();

  const [userID, setUserID] = useState();

  useEffect(() => {
    setUserID(app.currentUser.id);
  }, []);

  return (
    <Card variant={"outline"}>
      <CardBody>
        <Heading>Profil</Heading>
        <Text>{userID}</Text>
        <Text>Anmeldemethode: {app.currentUser.providerType}</Text>
      </CardBody>
    </Card>
  );
}

export default Profil;
