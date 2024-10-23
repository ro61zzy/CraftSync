// src/app/api/invites/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, role } = await req.json();

  // Generate a random invite token (you can also use UUID for secure tokens)
  const inviteToken = Math.random().toString(36).substring(2, 15);

  try {
    // Save the invite token and role in the database (associated with email)
    await prisma.invite.create({
      data: {
        email,
        role,  // TEAM or CLIENT based on admin's selection
        token: inviteToken,
      },
    });

    // (Optional) Send the invite link via email using an email service (like SendGrid or Nodemailer)
    const inviteLink = `${process.env.BASE_URL}/accept-invite?token=${inviteToken}`;
    console.log(`Invite link: ${inviteLink}`);

    return NextResponse.json({ message: 'Invite sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error sending invite' }, { status: 500 });
  }
}
