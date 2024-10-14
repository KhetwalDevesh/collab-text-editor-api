import { FastifyReply, FastifyRequest } from "fastify";
import { LoginRequest, RegisterRequest } from "../types/interfaces";
import { prisma } from "../server";
import bcrypt from "bcrypt";
import { getNewUserId } from "../utils/ids";

export async function register(
  request: FastifyRequest<RegisterRequest>,
  reply: FastifyReply
) {
  const { name, email, password } = request.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      reply.status(409).send({ message: `Email <${email}> already exists` });
      return;
    }
    const password_hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        id: getNewUserId(),
        name,
        email,
        password_hash,
      },
    });
    reply.status(201);
  } catch (error) {
    console.error("Error registering user: ", error);
    reply.status(500).send({
      error: `An error occurred while registering the user: ${error}`,
    });
  }
}

export async function login(
  request: FastifyRequest<LoginRequest>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      reply.status(401).send({ message: "Invalid credentials" });
      return;
    }
    const { id } = user;
    const token = await reply.jwtSign({ id }, { expiresIn: "" });
    const { password_hash, createdAt, updatedAt, ...me } = user;
    reply.send({ token, me });
  } catch (error) {
    console.error("Error logging in: ", error);
    reply
      .status(500)
      .send({ error: `An error occurred while logging in: ${error}` });
  }
}
