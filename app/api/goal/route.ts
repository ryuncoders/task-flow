import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const goalId = url.searchParams.get("goalId");

    const session = await getSession();
    const goals = await prisma.goal.findMany({
      where: {
        userId: 1, //session.userId
      },
      select: {
        id: true,
        title: true,
        description: true,
        period: true,
      },
    });

    console.log("goals session", goals);
    if (!goals) {
      return NextResponse.json({
        success: false,
        error: "goal database에서 불러오기 오류",
      });
    } else {
      return NextResponse.json({
        success: true,
        goals,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "goal 불러오기 오류" + error,
    });
  }
}
