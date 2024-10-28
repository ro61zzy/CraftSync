// src/app/api/client/projects/route.ts
import prisma from '../../utils/prisma';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
 

  // try {
  //   // Fetch projects assigned to the logged-in client
  //   const projects = await prisma.project.findMany({
  //     where: {
  //       clients: {
  //         some: {
          
  //         },
  //       },
  //     },
  //     include: {
  //       tasks: true, // Include tasks for each project
  //     },
  //   });

  //   return NextResponse.json({ projects }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ message: 'Error fetching projects', error: error}, { status: 500 });
  // }
}
