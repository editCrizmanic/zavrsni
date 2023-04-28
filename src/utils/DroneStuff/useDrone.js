import { useState } from "react";
import { randomColor, id } from "../UserInfo/avatar";
import { addMessage, setUser } from "../../store/drone";

export const useDrone = () => {
  const [state, setState] = useState({
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

    setUser(member);

    setState((prevState) => {
      return { ...prevState, drone };
    });
  };

  const room = state.drone?.subscribe("observable-books");

  room?.on("message", (data) => {
    console.log(data);
    const message = {
      member: data.member.clientData,
      text: data.data,
    };
    addMessage(message);
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
