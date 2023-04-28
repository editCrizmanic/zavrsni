import { proxy } from "valtio";

export const INITIAL_STATE = {
  user: null,
  room: null,
  messages: [],
};

export const droneStore = proxy(INITIAL_STATE);

export const setUser = (user) => {
  droneStore.user = user;
};

export const setRoom = (instance, name) => {
  droneStore.room = { instance, name };
};

export const addMessage = (message) => {
  droneStore.messages = [...droneStore.messages, message];
};
