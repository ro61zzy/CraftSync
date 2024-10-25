// src/app/api/invites/[token]/route.ts
import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
  const { token } = params;

  try {
    const invite = await prisma.invite.findUnique({
      where: { token },
    });

    if (!invite) {
      return NextResponse.json({ message: 'Invalid invite' }, { status: 404 });
    }

    return NextResponse.json({ phone: invite.phone, role: invite.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching invite' }, { status: 500 });
  }
}
