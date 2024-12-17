import prisma from "@/lib/prisma";
import { getWeeklyColors } from "@/lib/utils";
import { endOfWeek, startOfWeek } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
  const goalIdParam = request.nextUrl.pathname.split("/").pop();

  if (!goalIdParam) {
    return NextResponse.json(
      {
        success: false,
        error: "goalId is required",
      },
      { status: 400 }
    );
  }

  const goalId: number = parseInt(goalIdParam, 10);
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 });

  try {
    const workItems = await prisma.workItem.findMany({
      where: {
        goalId,
        createdAt: {
          gte: startOfThisWeek,
          lte: endOfThisWeek,
        },
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
          isComplete: task.isComplete, // string -> boolean 변환
        })),
      })),
    }));

    console.log("api workItems", updatedWorkItems);

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
