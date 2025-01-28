// src/app/api/invites/accept/route.ts

import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, userId } = await req.json();

  if (!token || !userId) {
    return NextResponse.json({ message: 'Token and userId are required' }, { status: 400 });
  }

  // Find the invite using the token
  const invite = await prisma.invite.findUnique({ where: { token } });

  if (!invite) {
    return NextResponse.json({ message: 'Invalid or expired invite token' }, { status: 404 });
  }

  // Add the user to the project via UserOnProject
  await prisma.userOnProject.create({
    data: {
      userId, // The ID of the user accepting the invite
      projectId: invite.projectId, // The project ID from the invite
      role: invite.role, // The role from the invite
    },
  });

  // Optionally delete the invite after it's been used
  await prisma.invite.delete({ where: { token } });

  return NextResponse.json({ message: 'Invite accepted and user linked to project' }, { status: 200 });
}

  