export const dynamic = "force-dynamic";

import { NextRequest } from 'next/server';
import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

interface Params {
  token: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
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
