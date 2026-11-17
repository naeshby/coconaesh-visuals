import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js";

// Single shared client for the whole process.
export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});