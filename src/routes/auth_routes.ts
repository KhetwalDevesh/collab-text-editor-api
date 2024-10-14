import { FastifyPluginAsync } from "fastify";
import { LoginSchema, RegisterSchema } from "../schemas/auth_schemas";
import { login, register } from "../controllers/auth_controller";

export const authRoutes: FastifyPluginAsync = async (server, _options) => {
  server.post("/auth/register", { schema: RegisterSchema }, register);
  server.post("/auth/login", { schema: LoginSchema }, login);
};
