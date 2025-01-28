import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const userId = req.headers.get('user-id'); // Assuming `user-id` is sent in the request header

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch projects where the user is the creator or part of the project
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { createdById: parseInt(userId) }, // Projects created by the user
          { teamMembers: { some: { id: parseInt(userId) } } }, // Projects where the user is a team member
          { clients: { some: { id: parseInt(userId) } } }, // Projects where the user is a client
        ],
      },
      include: { tasks: true, milestones: true }, // Include related data as needed
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ message: 'Error fetching projects' }, { status: 500 });
  }
}
