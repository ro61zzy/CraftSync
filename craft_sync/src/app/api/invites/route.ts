// src/app/api/invites/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { phone, role, projectId } = await req.json();  // Ensure projectId is included

  const inviteToken = Math.random().toString(36).substring(2, 15);

  try {
    const invite = await prisma.invite.create({
      data: {
        phone,
        role,
        token: inviteToken,
        project: { connect: { id: projectId } },  // Link invite to the project
      },
    });

    const inviteLink = `${process.env.BASE_URL}/accept-invite?token=${inviteToken}`;
    return NextResponse.json({ message: 'Invite created successfully', inviteLink }, { status: 200 });
  } catch (error) {
    console.error('Error creating invite:', error);
    return NextResponse.json({ message: 'Error creating invite', error: error }, { status: 500 });
  }
}