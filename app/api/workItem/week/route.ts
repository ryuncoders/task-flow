import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session/get";
import { getWeeklyColors } from "@/lib/utils";
import { endOfWeek, startOfWeek } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const session = await getSession();
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // 월요일 시작 (기본값은 일요일)
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weekWorkItems = await prisma.workItem.findMany({
      where: {
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      include: {
        timeLines: true,
      },
    });

    if (!weekWorkItems) {
      return NextResponse.json({
        success: false,
        error: "weekWorkItems 존재하지 않음",
      });
    } else {
      const updateWorkItem = weekWorkItems.map((workItem) => ({
        ...workItem,
        timeLines: workItem.timeLines.map((timeLine) => ({
          ...timeLine,
          dateStart: timeLine.dateStart.toISOString(),
          dateEnd: timeLine.dateEnd.toISOString(),
          dateTimeLineColor: getWeeklyColors({
            dateRange: [timeLine.dateStart + "", timeLine.dateEnd + ""],
            color: timeLine.color,
          }),
        })),
      }));

      return NextResponse.json({
        success: true,
        weekWorkItems: updateWorkItem,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "api 접근 오류",
    });
  }
}
