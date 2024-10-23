// src/app/api/invites/[token]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { token } = params;

  try {
    const invite = await prisma.invite.findUnique({
      where: { token },
    });

    if (!invite) {
      return NextResponse.json({ message: 'Invalid invite' }, { status: 404 });
    }

    return NextResponse.json({ email: invite.email, role: invite.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching invite' }, { status: 500 });
  }
}
