// src/app/api/projects/route.ts
import prisma from '../utils/prisma';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const { name, tasks } = await req.json();
  console.log('Incoming data:', { name, tasks }); // Log incoming data
  
  if (!tasks) {
    return NextResponse.json({ message: 'Tasks array is missing' }, { status: 400 });
  }


  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        tasks: {
          create: Array.isArray(tasks) ? tasks.map((task) => ({ name: task.name })) : [], // Guard against undefined
        },
      },
    });
    
    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ message: 'Error creating project', error: error.message }, { status: 500 });
  }
  
  
}
