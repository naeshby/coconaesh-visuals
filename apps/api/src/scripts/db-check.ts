import { prisma } from "../lib/prisma.js";

async function main() {
  console.log("Connecting to PostgreSQL through Prisma...");

  const created = await prisma.systemCheck.create({
    data: { note: "Phase 0 connectivity check" },
  });
  console.log(`  ✓ write   id=${created.id}`);

  const found = await prisma.systemCheck.findUniqueOrThrow({
    where: { id: created.id },
  });
  console.log(`  ✓ read    note="${found.note}" createdAt=${found.createdAt.toISOString()}`);

  await prisma.systemCheck.delete({ where: { id: created.id } });
  console.log("  ✓ delete  test row removed");

  console.log("Database connectivity verified.");
}

main()
  .catch((error) => {
    console.error("Database check FAILED:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });