// src/app/api/auth/signup/route.ts
import prisma from '../../utils/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { email, password, role } = await req.json();

//     // Check if all required fields are present
//     if (!email || !password || !role) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//     }

//     // Hash the password
//     const hashedPassword = await hash(password, 10);

//     // Attempt to create the user
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         role,
//       },
//     });

//     return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return NextResponse.json({ message: 'Error creating user', error }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (!email || !password || !role) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const { default: prisma } = await import('../../utils/prisma');

  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user', error }, { status: 500 });
  }
}
