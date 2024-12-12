import { ITask } from "@/app/(tabs)/@todo/default";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session/get";
import { NextResponse } from "next/server";

interface ApiResponse {
  success: boolean; // 성공 여부
  tasks?: ITask[]; // 성공 시 포함되는 데이터
  error?: string; // 실패 시 포함되는 에러 메시지
}

export async function GET(): Promise<NextResponse> {
  try {
    const session = await getSession();
    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfToday = new Date(new Date().setHours(23, 59, 59, 999));

    const tasks = await prisma.task.findMany({
      where: {
        date: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      include: {
        timeLine: {
          select: {
            workItem: {
              select: {
                title: true,
                goal: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("task", tasks);

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
    console.log("error prisma 접속 오류");
    return NextResponse.json<ApiResponse>({
      success: false,
      error: "get tasks, api 접속 불가",
    });
  }
}
