// src/app/api/projects/my_projects/route.ts

import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const userId = req.headers.get('user-id'); // Assuming the user's ID is sent in the header
  
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }
  
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: { userId: parseInt(userId) }, // Adjust field names to match your schema
        },
      },
      include: { tasks: true, milestones: true }, // Include related data as needed
    });
  
    return NextResponse.json({ projects }, { status: 200 });
  }
  