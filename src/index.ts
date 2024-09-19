import express, { Request, Response } from "express";
import "dotenv/config";
import os from "os";
import postgres from "postgres";

// import pg from "pg";
// const { Client } = pg;
// const client = new Client({
//   user: "yourusername",
//   host: "localhost",
//   database: "yourdatabase",
//   password: "yourpassword",
//   port: 5432,
// });

const app = express();
const port = 3000;

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "API up and running", hostname: os.hostname() });
});

app.get("/", async (req: Request, res: Response) => {
  // await client.connect();
  // const response = await client.query("SELECT $1::text as message", [
  //   "Hello world!",
  // ]);
  // console.log(response.rows[0].message); // Hello world!
  // await client.end();

  console.log("ENV DB URL: ", process.env.DATABASE_URL);
  let data;
  try {
    const sql = postgres({
      user: "yourusername",
      host: "db",
      database: "yourdatabase",
      password: "yourpassword",
      port: 5432,
    });

    data = await sql`SELECT NOW();`;

    console.log("Data: ", data);
  } catch (err) {
    console.log("This error: ", err);
  }

  res.json({
    message: "Deployment again successfull" + data,
    hostname: os.hostname(),
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
