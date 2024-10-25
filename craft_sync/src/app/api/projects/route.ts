import prisma from '../utils/prisma';
import { NextResponse } from 'next/server';


// Handler for creating a project (POST request)
export async function POST(req: Request) {
  const { name, description, tasks = [], milestones = [] } = await req.json();

  try {
    // Create the project with description, tasks, and milestones
    const newProject = await prisma.project.create({
      data: {
        name,
        description,  // Add description to project creation
        tasks: {
          create: tasks.map((task) => ({ name: task.name })),
        },
        milestones: {
          create: milestones.map((milestone) => ({
            name: milestone.name,
            dueDate: new Date(milestone.dueDate),
          })),
        },
      },
    });

    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error); // Log the error for debugging
    return NextResponse.json({ message: 'Error creating project', error: error.message }, { status: 500 });
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
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching projects', error: error.message }, { status: 500 });
  }
}
