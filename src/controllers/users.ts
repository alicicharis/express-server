import { users, CreateUser } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const createUser = async (userData: CreateUser) => {
  return (
    await db.insert(users).values(userData).returning({ userId: users.id })
  )[0];
};

export const getAllUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
};
