import { v4 as uuidv4 } from "uuid";

// ------ creates random username and avatar ---------------------------------------------------------------------
export const randomName = () => {
  const firstParts = ["autumn", "hidden", "bitter"];
  const secondParts = ["waterfall", "river", "breeze"];
  const firstPart = firstParts[Math.floor(Math.random() * firstParts.length)];
  const secondPart =
    secondParts[Math.floor(Math.random() * secondParts.length)];
  return firstPart + secondPart;
};

export const randomColor = () => {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

export const id = uuidv4();
