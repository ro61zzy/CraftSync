// src/app/api/invites/verify/route.ts

import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  const invite = await prisma.invite.findUnique({ where: { token } });

  if (!invite) {
    return NextResponse.json({ message: 'Invalid or expired invite token' }, { status: 404 });
  }

  return NextResponse.json({ 
    message: 'Invite is valid', 
    projectId: invite.projectId, 
    role: invite.role 
  }, { status: 200 });
}
