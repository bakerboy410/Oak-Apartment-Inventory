import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { items } from "../data/item";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.variantImage.deleteMany();
  await prisma.itemImage.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.item.deleteMany();

  for (const item of items) {
    await prisma.item.create({
      data: {
        name: item.name,
        description: item.description,
        store: String(item.store),

        hasQuantity: item.hasQuantity,
        quantity: item.quantity ?? null,
        unit: item.unit ?? null,

        images: {
          create: item.images.map((url) => ({
            url,
          })),
        },

        variants: {
          create: item.variants.map((variant) => ({
            name: variant.name,

            hasQuantity: variant.hasQuantity,
            quantity: variant.quantity ?? null,
            unit: variant.unit ?? null,

            images: {
              create: variant.images.map((url) => ({
                url,
              })),
            },
          })),
        },
      },
    });
  }

  await prisma.appSettings.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      apartmentName: "Oak Apartments",
      totalTrappers: 206,
    },
  });

  await prisma.borrower.deleteMany();

  await prisma.borrower.createMany({
    data: [
      {
        name: "John Kamau",
        phone: "0712345678",
        quantity: 5,
      },
      {
        name: "Mary Wanjiru",
        phone: "0700111222",
        quantity: 12,
      },
    ],
  });

  console.log("✅ Database seeded.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
