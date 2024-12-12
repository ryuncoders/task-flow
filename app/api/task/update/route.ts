import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, isComplete } = body;

    const updateTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isComplete,
      },
      select: {
        id: true,
      },
    });

    if (!updateTask.id) {
      return NextResponse.json({
        success: false,
        error: "task 업데이트 실패",
      });
    } else {
      console.log("ok");
      return NextResponse.json({
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "task 업데이트 api 오류",
    });
  }
}
