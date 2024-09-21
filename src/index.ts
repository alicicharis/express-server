import express, { Request, Response } from "express";
import "dotenv/config";
import os from "os";
import { usersRouter } from "./routes/users";
import { booksRouter } from "./routes/books";
import { getUserByEmail } from "./controllers/users";
import { books } from "./db/schema";
import { db } from "./db";

const app = express();
const port = 3000;
app.use(express.json());

const userId = "c7daeuav5uffcgrocnx7r6yzuiqnnogjxd7lc57sojdvsav5vqpq";

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "Updated API up and running", hostname: os.hostname() });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Deployment again successfull",
    hostname: os.hostname(),
  });
});

app.post("/setup", async (req: Request, res: Response) => {
  const user = await getUserByEmail("haris.alicic1@gmail.com");

  const randomSentences = Array.from({ length: req.body.total || 100 }).map(
    generateRandomSentence
  );

  if (user) {
    for (const sentence of randomSentences) {
      await db.insert(books).values({ userId: user?.id, title: sentence });
    }
  }

  res.json({
    message: "Setup successful",
    hostname: os.hostname(),
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function generateRandomSentence() {
  const words = [
    "sky",
    "ocean",
    "mountain",
    "river",
    "sun",
    "moon",
    "stars",
    "cloud",
    "rain",
    "wind",
    "forest",
    "tree",
    "leaf",
    "flower",
    "grass",
    "desert",
    "sand",
    "snow",
    "fire",
    "storm",
  ];

  // Generate a single random sentence
  return (
    Array.from({ length: 5 }) // Create an array of length 5
      .map(() => words[Math.floor(Math.random() * words.length)]) // Select random word for each position
      .join(" ") + "."
  ); // Join the words into a sentence and add period at the end
}
