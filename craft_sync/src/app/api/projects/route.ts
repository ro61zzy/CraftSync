export const dynamic = "force-dynamic";

import prisma from '../utils/prisma';
import { NextResponse } from 'next/server';

// Define interfaces for Task and Milestone
interface Task {
  name: string;
}

interface Milestone {
  name: string;
  dueDate: string;  // Assuming dueDate is a string in ISO format
}

// Handler for creating a project (POST request) will build
export async function POST(req: Request) {
  const { name, description, tasks = [] as Task[], milestones = [] as Milestone[] } = await req.json();

  try {
    // Create the project with description, tasks, and milestones
    const newProject = await prisma.project.create({
      data: {
        name,
        description,  // Add description to project creation
        tasks: {
          create: tasks.map((task: { name: any; }) => ({ name: task.name })),
        },
        milestones: {
          create: milestones.map((milestone: { name: any; dueDate: string | number | Date; }) => ({
            name: milestone.name,
            dueDate: new Date(milestone.dueDate),
          })),
        },
      },
    });

    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating project:", error); // Log the error for debugging
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: 'Error creating project', error: errorMessage }, { status: 500 });
  }
}

// Handler for fetching all projects (GET request)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
        milestones: true,
      },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching projects:", error); // Log the error for debugging
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: 'Error fetching projects', error: errorMessage }, { status: 500 });
  }
}
