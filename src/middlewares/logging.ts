import { FastifyReply, FastifyRequest } from 'fastify';

export async function requestLogger(request: FastifyRequest, reply: FastifyReply) {
  const start = Date.now();
  request.log.info({ req: request }, 'Request received');

  reply.raw.on('finish', () => {
    const responseTime = Date.now() - start;
    request.log.info({ res: reply, responseTime }, 'Response sent');
  });
}
