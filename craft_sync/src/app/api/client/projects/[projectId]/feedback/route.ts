// src/app/api/client/projects/[projectId]/feedback/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request, { params }) {
  const { projectId } = params;
  const { feedback } = await req.json();

  try {
    // Save client feedback in the database
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        feedback: {
          create: {
            message: feedback,
          },
        },
      },
    });

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting feedback', error: error.message }, { status: 500 });
  }
}
