import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../server";
import { getNewRoomId } from "../utils/ids";
import { Prisma } from "@prisma/client";

export const createNewRoom = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const newRoomId = getNewRoomId();
    const newRoom = await prisma.room.create({
      data: {
        id: newRoomId,
        link: newRoomId,
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

export const getRoomDetails = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  try {
    const room = await prisma.room.findUnique({
      where: { id },
      select: { isRoomActive: true },
    });
    if (!room) {
      return reply.status(404).send({ error: "Room not found" });
    }
    return reply.send(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

export const addUserToRoom = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { roomId } = request.params as { roomId: string };
  const { hostId, username } = request.body as any;
  try {
    // Fetch the existing users from the room
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: { users: true },
    });

    if (!room) {
      return reply.status(404).send({ error: "Room not found" });
    }

    // Ensure users are treated as an array
    const currentUsers = (room.users as Prisma.JsonArray) || [];

    console.log("currentUsers", JSON.stringify(currentUsers, null, 2));

    // Append the new user to the users array
    const updatedUsers = [...currentUsers, username];

    console.log("updatedUsers", JSON.stringify(updatedUsers, null, 2));

    // Update the room with the new users array
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: { users: updatedUsers },
    });

    if (hostId) {
      await prisma.room.update({
        where: { id: roomId },
        data: {
          hostId: hostId,
        },
      });
    }
    reply.status(200).send(updatedRoom);
  } catch (error) {
    console.error("Error adding user: ", error);
    reply.status(500).send({ error: "Failed to add user to room" });
  }
};
