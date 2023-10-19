import React, { useEffect } from "react";

import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";

function Profil() {
  const app = useRealm();

  useEffect(() => {
    console.log(app.currentUser.customData);
  }, []);

  return (
    <Card variant={"outline"}>
      <CardBody>
        <Heading>Profil</Heading>
        {app.currentUser.customData.nickname ? (
          <Text>{app.currentUser.customData.nickname}</Text>
        ) : (
          <Text>NONAME</Text>
        )}

        <Text>{app.currentUser.id}</Text>
        <Text>Anmeldemethode: {app.currentUser.providerType}</Text>
      </CardBody>
    </Card>
  );
}

export default Profil;
