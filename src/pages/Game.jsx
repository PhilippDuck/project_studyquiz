import React from "react";
import { useParams } from "react-router-dom";

function Game() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Game;
