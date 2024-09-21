import { lucia } from "./lucia";

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});

  return session;
};
