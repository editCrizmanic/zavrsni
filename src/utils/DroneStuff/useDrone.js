import { useState } from "react";
import { randomColor, id } from "../UserInfo/avatar";
import {
  addMessage,
  setRoom,
  setUser,
  droneStore,
  addMembers,
  exitMembers,
  resetToInitialState,
} from "../../store/drone";
import { useSnapshot } from "valtio";

{
  /* ----------------------------- The main thing  ----------------------------- */
}

export const useDrone = () => {
  const { room: currentRoom } = useSnapshot(droneStore);
  const [state, setState] = useState({
    drone: null,
  });

  {
    /* ----------------------------- Login function  ----------------------------- */
  }
  const onLogIn = (user, chat) => {
    const member = {
      username: user,
      color: randomColor(),
      id,
    };
    console.log("Channel ID:", process.env.REACT_APP_CHANNEL1_KEY);
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

  {
    /* ----------------------------- Various room listeners  ----------------------------- */
  }

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
      const newMembers = members.map((member) => member.clientData);
      addMembers(newMembers);
      console.log("list of memebers: ", newMembers);
    });
    room.on("member_join", (member) => {
      addMembers([member.clientData]);
      const notificationJoin = {
        member: { username: "Chatbot Pero" },
        text: `${member.clientData.username} joined the chat. 😀`,
      };
      addMessage(notificationJoin);
    });
    room.on("member_leave", function (member) {
      console.log("ode ča:", member);
      exitMembers(member.clientData);
      const notificationLeave = {
        member: { username: "Chatbot Pero" },
        text: `${member.clientData.username} left the chat. 👋`,
      };
      addMessage(notificationLeave);
    });
  };

  {
    /* ----------------------------- Log out  ----------------------------- */
  }

  const onLogOut = (chat, room) => {
    room.unsubscribe(`observable-${chat}`);
    resetToInitialState();
    state.drone.close(`observable-${chat}`);
    setState({ drone: null });
  };

  {
    /* ----------------------------- Send message  ----------------------------- */
  }

  const onSendMessage = (message) => {
    console.log(message, currentRoom.name);
    state.drone?.publish({
      room: `observable-${currentRoom.name}`,
      message,
    });
  };

  {
    /* ----------------------------- returns  ----------------------------- */
  }

  return {
    state,
    onSendMessage,
    onLogIn,
    onLogOut,
  };
};
