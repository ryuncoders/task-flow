import { ITask } from "@/app/(tabs)/@todo/default";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session/get";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

interface ApiResponse {
  success: boolean; // 성공 여부
  tasks?: ITask[]; // 성공 시 포함되는 데이터
  error?: string; // 실패 시 포함되는 에러 메시지
}

export async function GET(): Promise<NextResponse> {
  try {
    const session = await getSession();
    const today = startOfDay(new Date());

    const tasks = await prisma.task.findMany({
      where: {
        timeLine: {
          workItem: {
            goal: {
              userId: +session.userId!,
            },
          },
        },
        date: today,
      },
    });

    if (!tasks) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: "user not found.",
      });
    } else {
      return NextResponse.json<ApiResponse>({
        success: true,
        tasks,
      });
    }
  } catch (error) {
    return NextResponse.json<ApiResponse>({
      success: false,
      error: "get tasks, api 접속 불가",
    });
  }
}
