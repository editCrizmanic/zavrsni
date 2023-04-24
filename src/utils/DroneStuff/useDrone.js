import { useState } from "react";
import { randomName, randomColor, id } from "../UserInfo/randomInfo";
import { droneInit } from "../DroneStuff/droneInit";

export const useDrone = () => {
  const [state, setState] = useState({
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
      id,
    },
  });

  const room = droneInit.subscribe("observable-books");

  room.on("data", (data, member) => {
    setState((prevState) => {
      const messages = [...prevState.messages];
      messages.push({ member, text: data });
      return { ...prevState, messages };
    });
  });

  const onSendMessage = (message) => {
    droneInit.publish({
      room: "observable-books",
      message,
    });
  };

  return {
    state,
    onSendMessage,
  };
};
