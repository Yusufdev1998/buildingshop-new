import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  errorFormat: "minimal",
  log: ["error", "info", "query"],
});

export default prisma;
