// src/app/api/invites/accept/route.ts

import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { token, userId } = await req.json();
  
    if (!token || !userId) {
      return NextResponse.json({ message: 'Token and userId are required' }, { status: 400 });
    }
  
    const invite = await prisma.invite.findUnique({ where: { token } });
  
    if (!invite) {
      return NextResponse.json({ message: 'Invalid or expired invite token' }, { status: 404 });
    }
  
    // Link the invite to the user (e.g., add them to the project)
    await prisma.userOnProject.create({
      data: {
        userId,
        projectId: invite.projectId,
        role: invite.role,
      },
    });
  
    // Optionally delete the invite after it's been used
    await prisma.invite.delete({ where: { token } });
  
    return NextResponse.json({ message: 'Invite accepted and linked to user' }, { status: 200 });
  }
  