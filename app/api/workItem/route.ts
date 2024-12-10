import prisma from "@/lib/prisma";
import { getWeeklyColors } from "@/lib/utils";
import { NextResponse } from "next/server";

interface ReturnWorkItem {
  success: boolean;
  error?: string;
  updatedWorkItems?: Array<{
    id: number;
    title: string;
    timeLines: Array<{
      id: number;
      title: string;
      dateStart: string;
      dateEnd: string;
      color: string;
      dateTimeLineColor?: string[];
      tasks: Array<{
        id: number;
        isComplete: boolean;
        text: string;
        date: string;
      }>;
    }>;
  }>;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get("goalId");

  if (!goalId || isNaN(Number(goalId))) {
    return NextResponse.json({
      success: false,
      error: "유효하지 않은 goalId",
    } as ReturnWorkItem);
  }

  try {
    const workItems = await prisma.workItem.findMany({
      where: {
        goalId: parseInt(goalId),
      },
      select: {
        id: true,
        title: true,
        timeLines: {
          select: {
            id: true,
            title: true,
            dateStart: true,
            dateEnd: true,
            color: true,
            tasks: {
              select: {
                id: true,
                isComplete: true,
                text: true,
                date: true,
              },
            },
          },
        },
      },
    });

    if (workItems.length === 0) {
      return NextResponse.json({
        success: false,
        error: "관련 workItem 없음",
      } as ReturnWorkItem);
    }

    const updatedWorkItems = workItems.map((workItem) => ({
      ...workItem,
      timeLines: workItem.timeLines.map((timeLine) => ({
        ...timeLine,
        dateStart: timeLine.dateStart.toISOString(), // Date -> string으로 변환
        dateEnd: timeLine.dateEnd.toISOString(), // Date -> string으로 변환
        dateTimeLineColor: getWeeklyColors({
          dateRange: [timeLine.dateStart + "", timeLine.dateEnd + ""],
          color: timeLine.color,
        }),
        tasks: timeLine.tasks.map((task) => ({
          ...task,
          date: task.date.toISOString(), // Date -> string으로 변환
          isComplete: task.isComplete === "true" ? true : false, // string -> boolean 변환
        })),
      })),
    }));

    return NextResponse.json({
      success: true,
      updatedWorkItems,
    } as ReturnWorkItem);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({
      success: false,
      error: "서버 오류 발생",
    } as ReturnWorkItem);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, goalId } = body;
    const findData = await prisma.goal.findUnique({
      where: {
        id: +goalId,
      },
      select: {
        id: true,
      },
    });

    if (!findData) {
      return NextResponse.json({
        success: false,
        errorMessage: "해당 goal 없음",
      });
    }

    const newWorkItem = await prisma.workItem.create({
      data: {
        goalId: +goalId,
        title,
      },
      select: {
        id: true,
      },
    });
    if (!newWorkItem) {
      return NextResponse.json({
        success: false,
        errorMessage: "newworkItem 생성 실패",
      });
    }

    return NextResponse.json({
      success: true,
      workItemId: newWorkItem.id,
    });
  } catch (error) {
    console.log("error");
    return NextResponse.json({
      success: false,
      errorMessage: "error 발생",
    });
  }
}
