import { proxy } from "valtio";

/* ----------------------------- Valtio state management  ----------------------------- */

/* ----------------------------- Initial state  ----------------------------- */

export const INITIAL_STATE = {
  user: null,
  room: null,
  messages: [],
  members: [],
};

export const droneStore = proxy(INITIAL_STATE);

/* ----------------------------- Actions  ----------------------------- */

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
  droneStore.members = droneStore.members.filter(
    (exitMember) => exitMember.id !== user.id
  );
};

export const resetToInitialState = () => {
  droneStore.user = INITIAL_STATE.user;
  droneStore.room = INITIAL_STATE.room;
  droneStore.messages = INITIAL_STATE.members;
  droneStore.members = INITIAL_STATE.members;
};
