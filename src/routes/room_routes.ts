import { FastifyPluginAsync } from "fastify";
import { CreateRoomSchema } from "../schemas/room_schemas";
import { createNewRoom } from "../controllers/room_controller";

export const roomRoutes: FastifyPluginAsync = async (server, _options) => {
  server.post("/room", { schema: CreateRoomSchema }, createNewRoom);
};
