import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("Session found:", session);

  if (!session) {
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }

  return NextResponse.json({ session }, { status: 200 });
}
