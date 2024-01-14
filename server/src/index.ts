import express, { Express, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/todos", async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/api/todos", async (req: Request, res: Response) => {
  const { content } = req.body;
  const result = await prisma.todo.create({
    data: {
      content,
    },
  });
  res.json(result);
});

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(result);
});

app.put("/api/todos/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      completed: !req.body.completed,
    },
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
