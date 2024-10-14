// ESM
import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import { requestLogger } from "./middlewares/logging";
import { errorHandler } from "./middlewares/errorHandler";
import { PrismaClient } from "@prisma/client";
import { authRoutes } from "./routes/auth_routes";
import fastifyJwt from "@fastify/jwt";
import { roomRoutes } from "./routes/room_routes";

export const prisma = new PrismaClient();

const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.register(fastifyCors, { origin: true });

server.register(fastifyJwt, {
  secret: "b1a0c3db2b84b4f3b4e0c4e9b1def4t94b0f9b2c4a7b6c9d1d7e8f1f4a7e3c5f",
  sign: { algorithm: "HS256" },
});

server.addHook("onRequest", requestLogger);

server.addHook("onError", errorHandler);

server.get("/", async (_request, reply) => {
  const resp = new Date();
  reply.send(`Time: ${resp}`);
});

server.get("/health", { logLevel: "silent" }, async (_request, reply) => {
  reply.send("OK");
});

server.register(
  async (app) => {
    app.register(authRoutes);
    app.register(roomRoutes);
  },
  { prefix: "/api/v1" }
);

const start = async () => {
  try {
    await server.listen({ port: 8081 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
