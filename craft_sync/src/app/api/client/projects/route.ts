// src/app/api/client/projects/route.ts
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch projects assigned to the logged-in client
    const projects = await prisma.project.findMany({
      where: {
        clients: {
          some: {
            email: token.email,
          },
        },
      },
      include: {
        tasks: true, // Include tasks for each project
      },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching projects', error: error.message }, { status: 500 });
  }
}
