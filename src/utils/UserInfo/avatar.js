import { v4 as uuidv4 } from "uuid";

{
  /* ----------------------------- Creates random avatar  ----------------------------- */
}

export const randomColor = () => {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

export const id = uuidv4();
