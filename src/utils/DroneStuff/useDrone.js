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

/* ----------------------------- THE MAIN THING  ----------------------------- */
/* ----------------- all drone related tgings are done here  ----------------- */

export const useDrone = () => {
  const { room: currentRoom } = useSnapshot(droneStore);
  const [state, setState] = useState({
    drone: null,
  });

  /* ----------------------------- Login function  ----------------------------- */
  /* sets the username, avatar, drone connection, subscribes user to the selected room, and calls for all room activities */
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
    setRoom({
      instance: room,
      name: chat,
    });
    setUpRoomListeners(room);
    setState((prevState) => {
      return { ...prevState, drone };
    });
  };

  /* ----------------------------- Various room listeners  ----------------------------- */
  /* lists members in a given room, sends notification when someone joins or leaves the room */

  const setUpRoomListeners = (room) => {
    room?.on("message", (data) => {
      const message = {
        member: data.member.clientData,
        text: data.data,
      };
      addMessage(message);
    });
    room?.on("members", (members) => {
      const newMembers = members.map((member) => member.clientData);
      addMembers(newMembers);
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
      exitMembers(member.clientData);
      const notificationLeave = {
        member: { username: "Chatbot Pero" },
        text: `${member.clientData.username} left the chat. 👋`,
      };
      addMessage(notificationLeave);
    });
  };

  /* ----------------------------- Log out  ----------------------------- */
  /* unsubscribes from the room, resets the state to initial value, closes the drone connection */

  const onLogOut = (chat, room) => {
    room.unsubscribe(`observable-${chat}`);
    resetToInitialState();
    state.drone.close(`observable-${chat}`);
    setState({ drone: null });
  };

  /* ----------------------------- Send message  ----------------------------- */
  /* publishes the message to the room */

  const onSendMessage = (message) => {
    state.drone?.publish({
      room: `observable-${currentRoom.name}`,
      message,
    });
  };

  /* ----------------------------- returns  ----------------------------- */
  /* all things that will be used somewhere else */

  return {
    state,
    onSendMessage,
    onLogIn,
    onLogOut,
  };
};
