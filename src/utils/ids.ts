// import { customAlphabet } from "nanoid";
const { customAlphabet } = require("nanoid");
// import { logger } from "./logger";

const ID_SIZE = 15;

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  ID_SIZE
);

export const getNewUserId = (): string => {
  try {
    return `usr_${nanoid()}`;
  } catch (error) {
    // logger.error(error, "error in getNewUserId-->");
    return `usr_${nanoid()}`;
  }
};

export const getNewRoomId = (): string => {
  try {
    return `room_${nanoid()}`;
  } catch (error) {
    // logger.error(error, "error in getNewRoomId-->");
    return `room_${nanoid()}`;
  }
};
