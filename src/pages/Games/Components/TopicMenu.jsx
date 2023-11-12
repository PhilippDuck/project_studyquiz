import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useRealm } from "../../../provider/RealmProvider";
import { MdOutlineFilterAlt } from "react-icons/md";

function TopicMenu({ handleFiltertopic }) {
  const app = useRealm();
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const result = await app.currentUser.functions.getTopics();

    setTopics(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      fetchTopics();
    }
  }, [isLoading]);

  return (
    <Menu
      onOpen={() => {
        setIsLoading(true);
      }}
    >
      <MenuButton as={Button} variant={"ghost"}>
        {isLoading ? <Spinner size="sm" /> : <MdOutlineFilterAlt />}
      </MenuButton>
      <MenuList>
        {topics.map((topic, index) => (
          <MenuItem
            onClick={() => {
              handleFiltertopic(topic.topic);
            }}
            key={index}
          >
            {topic.topic}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default TopicMenu;
