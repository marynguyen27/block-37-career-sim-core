const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `user${i}@example.com`,
        },
      })
    )
  );

  // Seed Items
  const items = await Promise.all(
    Array.from({ length: 75 }).map((_, i) =>
      prisma.item.create({
        data: {
          name: `Item ${i + 1}`,
        },
      })
    )
  );

  // Seed Reviews
  await Promise.all(
    Array.from({ length: 200 }).map((_, i) =>
      prisma.review.create({
        data: {
          text: `This is review number ${i + 1}`,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
          userId: users[Math.floor(Math.random() * users.length)].id,
          itemId: items[Math.floor(Math.random() * items.length)].id,
        },
      })
    )
  );

  console.log('Seeding completed!');
}
