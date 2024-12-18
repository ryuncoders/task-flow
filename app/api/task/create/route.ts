import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { workItemId, title, details, color } = body;

    const lastDetail = details[details.length - 1];
    const dateStart = `${details[0].year}-${details[0].month}-${details[0].day}`;
    const dateEnd = `${lastDetail.year}-${lastDetail.month}-${lastDetail.day}`;

    const findData = await prisma.workItem.findUnique({
      where: {
        id: workItemId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!findData) {
      return NextResponse.json({
        success: false,
        error: "not workItem",
      });
    } else {
      console.log("ok!");
    }

    const newTimeLine = await prisma.timeLine.create({
      data: {
        workItemId: findData.id,
        title,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        color: `#${color}`,
      },
      select: {
        id: true,
      },
    });

    if (!newTimeLine.id) {
      return NextResponse.json({
        success: false,
        error: "Failed create newTimeLine",
      });
    } else {
      console.log("ok!");
    }

    const newTask = details.map(
      (detail: { year: string; month: string; day: string; text: string }) => {
        return {
          text: detail.text,
          date: new Date(`${detail.year}-${detail.month}-${detail.day}`),
          timeLineId: newTimeLine.id,
        };
      }
    );

    const newTasks = await prisma.task.createManyAndReturn({
      data: newTask,
      select: {
        id: true,
      },
    });

    if (!newTasks) {
      return NextResponse.json({
        success: false,
        error: "Failed create newTask",
      });
    } else {
      console.log("ok!");
    }

    return NextResponse.json({
      success: true,
      timeLineId: newTimeLine.id,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Something went wrong" });
  }
}
