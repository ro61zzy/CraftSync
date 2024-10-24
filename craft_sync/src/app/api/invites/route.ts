// src/app/api/invites/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, role, projectId } = await req.json();  // Add projectId to request

  // Generate a random invite token (you can also use UUID for secure tokens)
  const inviteToken = Math.random().toString(36).substring(2, 15);

  try {
    // Save the invite token, role, and project in the database
    await prisma.invite.create({
      data: {
        email,
        role,  // TEAM or CLIENT based on admin's selection
        token: inviteToken,
        project: { connect: { id: projectId } },  // Link invite to the project
      },
    });

    // Send the invite link (console log or email)
    const inviteLink = `${process.env.BASE_URL}/accept-invite?token=${inviteToken}`;
    console.log(`Invite link: ${inviteLink}`);

    return NextResponse.json({ message: 'Invite sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error sending invite', error: error.message }, { status: 500 });
  }
}
