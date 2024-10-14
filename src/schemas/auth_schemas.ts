import { Type } from "@sinclair/typebox";

export const RegisterSchema = {
  body: Type.Object({
    name: Type.String({ minLength: 1 }),
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 1 }),
  }),
};

export const LoginSchema = {
  body: Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 1 }),
  }),
  response: {
    200: Type.Object({
      token: Type.String(),
      me: Type.Object({
        id: Type.String(),
        name: Type.String(),
      }),
    }),
  },
};
