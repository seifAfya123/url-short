import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function createUrl() {
  try {
    const url = await prisma.url.create({
      data: {
        mainUrl: "asd",
        shortUrl: "asd2",
      },
    });
    // const url = await prisma.url.deleteMany()
    console.log("Created URL:", url);
  } catch (err) {
    console.error("Error creating URL:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createUrl();
