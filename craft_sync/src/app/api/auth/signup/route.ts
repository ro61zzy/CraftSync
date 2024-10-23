// src/app/api/auth/signup/route.ts
import prisma from '../../utils/prisma';
import { hash } from 'bcryptjs';  // Use bcrypt to hash passwords
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  // Hash the password
  const hashedPassword = await hash(password, 10);

  try {
    // Create a new user with the provided role (default will be ADMIN in this case)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,  // Only allow ADMIN for sign-up
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
