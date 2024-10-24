// src/app/api/projects/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, tasks } = await req.json();

  try {
    // Create the project and associated tasks in the database
    const newProject = await prisma.project.create({
      data: {
        name,
        tasks: {
          create: tasks.map((task) => ({ name: task.name })),
        },
      },
    });

    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating project', error: error.message }, { status: 500 });
  }
}
