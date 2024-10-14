import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export async function errorHandler(
  request: FastifyRequest,
  reply: FastifyReply,
  error: FastifyError
) {
  request.log.error({ err: error }, "Request error");
  reply
    .status(500)
    .send({ error: `Internal Server Error, error: ${JSON.stringify(error)}` });
}
