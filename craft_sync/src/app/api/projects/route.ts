import prisma from '../utils/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';


export async function POST(req: Request) {
  console.log("Cookies:", req.headers.get('cookie'));  // ✅ Debug cookies

  // ✅ Correct usage of `getServerSession`
  const session = await getServerSession(authOptions); 

  console.log("Session found:", session);  // ✅ Debug session

  if (!session || !session.user || !session.user.id) {
    console.log("Session is missing:", session);
    return NextResponse.json({ message: 'Unauthorized: Please log in' }, { status: 401 });
  }

  const { name, description, tasks = [], milestones = [] } = await req.json();

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        createdById: session.user.id, // ✅ Use the logged-in user's ID
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

