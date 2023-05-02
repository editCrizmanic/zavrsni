import { useState } from "react";
import { randomColor, id } from "../UserInfo/avatar";
import {
  addMessage,
  setRoom,
  setUser,
  droneStore,
  addMembers,
} from "../../store/drone";
import { useSnapshot } from "valtio";

export const useDrone = () => {
  const { room: currentRoom } = useSnapshot(droneStore);

  const [state, setState] = useState({
    drone: null,
  });

  const onLogIn = (user, chat) => {
    const member = {
      username: user,
      color: randomColor(),
      id,
    };
    const drone = new window.Scaledrone(process.env.REACT_APP_CHANNEL1_KEY, {
      data: member,
    });

    setUser(member);

    const room = drone.subscribe(`observable-${chat}`);

    console.log("room instance", room);

    setRoom({
      instance: room,
      name: chat,
    });
    setUpRoomListeners(room);

    setState((prevState) => {
      return { ...prevState, drone };
    });
  };

  const setUpRoomListeners = (room) => {
    room?.on("message", (data) => {
      console.log(data);
      const message = {
        member: data.member.clientData,
        text: data.data,
      };
      addMessage(message);
    });
    room?.on("members", (members) => {
      addMembers(members);
      console.log("list of memebers: ", members);
    });
    room.on("member_join", (member) => {
      addMembers([member]);
      const notificationJoin = {
        member: { username: "Chatbot Pero" },
        text: `${member.clientData.username} joined the chat`,
      };
      addMessage(notificationJoin);
    });
  };

  const onSendMessage = (message) => {
    console.log(message, currentRoom.name);
    state.drone?.publish({
      room: `observable-${currentRoom.name}`,
      message,
    });
  };

  return {
    state,
    onSendMessage,
    onLogIn,
  };
};
