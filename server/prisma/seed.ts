import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const todoData: Prisma.TodoCreateInput[] = [
  {
    content: "Do the homeworks",
    completed: false,
  },
  {
    content: "Wash the dishes",
    completed: false,
  },
  {
    content: "Clean the car",
    completed: true,
  },
];

const main = async () => {
  console.log("Start Seeding...");
  for (const u of todoData) {
    const todo = await prisma.todo.create({
      data: u,
    });
    console.log(`Created todo with id ${todo.id}`);
  }
  console.log(`Seeding finished.`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
