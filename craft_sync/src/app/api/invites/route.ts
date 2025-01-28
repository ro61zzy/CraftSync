// src/app/api/invites/route.ts

import prisma from '../utils/prisma';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  const { phone, role, projectId } = await req.json();

  // Generate a unique token for the invite
  const inviteToken = Math.random().toString(36).substring(2, 15);

  try {
    // Convert projectId to an integer
    const parsedProjectId = parseInt(projectId, 10);
    if (isNaN(parsedProjectId)) {
      return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
    }

    // Create the invite in the database
    const invite = await prisma.invite.create({
      data: {
        phone,
        role,
        token: inviteToken,
        project: { connect: { id: parsedProjectId } },
      },
    });

    // Construct the invite link using BASE_URL from environment variables
    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/accept-invite?token=${inviteToken}`;
    return NextResponse.json({ message: 'Invite created successfully', inviteLink }, { status: 200 });
  } catch (error) {
    console.error('Error creating invite:', error);
    return NextResponse.json({ message: 'Error creating invite', error: error }, { status: 500 });
  }
}
