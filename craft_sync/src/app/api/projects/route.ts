import prisma from '../utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, description, tasks = [], milestones = [], userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    // Create the project and link it to the user (Project Manager)
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        createdBy: { connect: { id: userId } }, // Associate project with the user
        tasks: {
          create: tasks.map((task: { name: string }) => ({ name: task.name })),
        },
        milestones: {
          create: milestones.map((milestone: { name: string; dueDate: string }) => ({
            name: milestone.name,
            dueDate: new Date(milestone.dueDate),
          })),
        },
      },
    });

    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ message: 'Error creating project' }, { status: 500 });
  }
}
