import { books, CreateBook } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const createBook = async (bookData: CreateBook) => {
  return await db.insert(books).values(bookData).returning();
};

export const getAllBooks = async () => {
  return await db.query.books.findMany();
};

export const getBookById = async (id: number) => {
  return await db.query.books.findFirst({ where: eq(books.id, id) });
};
