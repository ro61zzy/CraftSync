// src/app/api/team/projects/route.ts
import prisma from '../../utils/prisma';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';



export async function GET(req: Request) {
  // const token = await getToken({ req });

  // if (!token) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }

  // try {
  //   // Fetch projects assigned to the logged-in team member
  //   const projects = await prisma.project.findMany({
  //     where: {
  //       teamMembers: {
  //         some: {
  //           email: token.email,
  //         },
  //       },
  //     },
  //     include: {
  //       tasks: true, // Include tasks for each project
  //     },
  //   });

  //   return NextResponse.json({ projects }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ message: 'Error fetching projects', error: error.message }, { status: 500 });
  // }
}
