import { proxy } from "valtio";
import { id } from "../utils/UserInfo/avatar";

export const INITIAL_STATE = {
  user: null,
  room: null,
  id,
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

export const addMembers = (newMembers) => {
  droneStore.members = [...droneStore.members, ...newMembers];
};

export const exitMembers = (user) => {
  droneStore.members.filter((exitMember) => exitMember !== user);
};
// znam da treba id, ali user je iz zabave. štaćemi 2 s istim imenom
