import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get("goalId");

  if (goalId === null) {
    return NextResponse.json({
      success: false,
      error: "goalId 없음",
    });
  }

  try {
    const workItems = await prisma.workItem.findMany({
      where: {
        goalId: parseInt(goalId),
      },
      select: {
        id: true,
        title: true,
        TimeLine: true,
      },
    });

    if (!workItems) {
      return NextResponse.json({
        success: false,
        error: "workItem 없음",
      });
    }
    return NextResponse.json({
      success: true,
      workItems,
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "api 접속 오류",
    });
  }
}
