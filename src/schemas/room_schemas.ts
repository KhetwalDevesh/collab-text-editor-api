import { Type } from "@sinclair/typebox";

export const CreateRoomSchema = {
  response: {
    200: Type.Object({
      id: Type.String(),
    }),
  },
};
