import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    const data = await prisma.test.create({
      data: {
        text: message,
      },
      select: {
        id: true,
      },
    });

    if (!message) {
      return NextResponse.json({
        success: false,
        error: "No message provided",
      });
    }
    return NextResponse.json({ success: true, echo: message });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Something went wrong" });
  }
}
