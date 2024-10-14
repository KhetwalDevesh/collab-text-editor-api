import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../server";
import { getNewRoomId } from "../utils/ids";

export const createNewRoom = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const newRoom = await prisma.room.create({
      data: {
        id: getNewRoomId(),
        link: "",
        documentId: "",
      },
    });
    console.log("newRoom", JSON.stringify(newRoom, null, 2));
    reply.send({ newRoom });
  } catch (error) {
    console.error("Error creating Room: ", error);
    reply.status(500).send({
      error: `An error occurred while registering the user: ${error}`,
    });
  }
};
