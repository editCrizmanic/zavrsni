import { proxy } from "valtio";

export const INITIAL_STATE = {
  user: null,
  room: null,
  messages: [],
  members: [],
};

export const droneStore = proxy(INITIAL_STATE);

export const setUser = (user) => {
  droneStore.user = user;
};

export const setRoom = (room) => {
  droneStore.room = room;
};

export const addMessage = (message) => {
  droneStore.messages = [...droneStore.messages, message];
};

export const addMembers = (member) => {
  droneStore.members = [...droneStore.members, member];
};
