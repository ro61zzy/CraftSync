import prisma from '../src/app/api/utils/prisma'

async function testConnection() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
