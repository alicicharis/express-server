import express from "express";
import { createBook, getAllBooks, getBookById } from "../controllers/books";

export const booksRouter = express.Router();

booksRouter.get("/", async (_, res) => {
  try {
    const books = await getAllBooks();

    res.status(200).json(books);
  } catch (err) {
    console.log("Get all books error: ", err);
  }
});

booksRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await getBookById(parseInt(id));

    res.status(200).json(book);
  } catch (err) {
    console.log("Get book by id error: ", err);
  }
});

booksRouter.post("/", async (req, res) => {
  try {
    const { title, userId }: { title: string; userId: string } = req.body;

    const response = await createBook({ title, userId });

    res.status(201).json(response);
  } catch (err) {
    console.log("Create book error: ", err);
  }
});
