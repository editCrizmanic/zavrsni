import { useState } from "react";
import { randomColor, id } from "../UserInfo/avatar";

export const useDrone = () => {
  const [state, setState] = useState({
    messages: [],
    member: null,
    drone: null,
  });

  const onLogIn = (user) => {
    const member = {
      username: user,
      color: randomColor(),
      id,
    };
    const drone = new window.Scaledrone(process.env.REACT_APP_CHANNEL1_KEY, {
      data: member,
    });

    setState((prevState) => {
      return { ...prevState, drone, member };
    });
  };

  const room = state.drone?.subscribe("observable-books");

  room?.on("message", (data) => {
    console.log(data);
    setState((prevState) => {
      const messages = [...prevState.messages];
      messages.push({
        member: data.member.clientData,
        text: data.data,
      });
      return { ...prevState, messages };
    });
  });

  const onSendMessage = (message) => {
    state.drone?.publish({
      room: "observable-books",
      message,
    });
  };

  return {
    state,
    onSendMessage,
    onLogIn,
  };
};
