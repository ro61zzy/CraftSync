// src/app/api/invites/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { phone, role, projectId } = await req.json();  // Use phone instead of email

  // Generate a unique invite token
  const inviteToken = Math.random().toString(36).substring(2, 15);

  try {
    // Save invite details in the database
    const invite = await prisma.invite.create({
      data: {
        phone,
        role,
        token: inviteToken,
        project: { connect: { id: projectId } },
      },
    });

    // Construct the WhatsApp invite link
    const inviteLink = `${process.env.BASE_URL}/accept-invite?token=${inviteToken}`;

    return NextResponse.json({ message: 'Invite created successfully', inviteLink }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating invite', error: error.message }, { status: 500 });
  }
}
