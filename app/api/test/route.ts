import { ResponseValue } from "@/app/test/page";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ResResult {
  success: boolean;
  user?: ResponseValue;
  error?: string;
}

export async function GET(request: Request) {
  try {
    // const { userId } = request.body;

    const data = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      select: {
        username: true,
        id: true,
        email: true,
      },
    });
    if (data) {
      return NextResponse.json({
        success: true,
        user: data,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "user가 존재하지 않음",
      });
    }
  } catch (error) {
    console.log("error: test api 접속 오류", error);
  }
}

export async function POST(request: Request) {
  const body = await request.json(); // POST 데이터 파싱
  return NextResponse.json({ message: "POST 요청 성공!", data: body });
}
