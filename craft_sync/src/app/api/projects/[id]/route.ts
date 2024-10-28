export const dynamic = "force-dynamic";


import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Destructure the id from params
    try {
      const project = await prisma.project.findUnique({
        where: { id: Number(id) }, // Ensure id is a number
        include: {
          tasks: true,
          milestones: true,
        },
      });
  
      if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
      }
  
      return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching project', error: error}, { status: 500 });
    }
  }
  