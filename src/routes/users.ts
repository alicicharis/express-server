import express from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/users";
import { generateIdFromEntropySize, Scrypt } from "lucia";

export const usersRouter = express.Router();

usersRouter.get("/", async (_, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    console.log("Get all users error: ", err);
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);

    res.status(200).json(user);
  } catch (err) {
    console.log("Get user by id error: ", err);
  }
});

usersRouter.route("/").post(async (req, res) => {
  try {
    console.log("Request body: ", req.body);
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;

    const passwordHash = await new Scrypt().hash(password);
    const id = generateIdFromEntropySize(32);

    const response = await createUser({ id, username, email, passwordHash });

    res.status(201).json(response);
  } catch (err) {
    console.log("Create user error: ", err);
  }
});
