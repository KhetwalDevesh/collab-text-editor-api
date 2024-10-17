import { FastifyPluginAsync } from "fastify";
import { CreateRoomSchema } from "../schemas/room_schemas";
import {
  addUserToRoom,
  createNewRoom,
  getRoomDetails,
} from "../controllers/room_controller";

export const roomRoutes: FastifyPluginAsync = async (server, _options) => {
  server.post("/room", createNewRoom);
  server.get("/room/:id", getRoomDetails);
  server.put("/room/:roomId/users", addUserToRoom);
};
