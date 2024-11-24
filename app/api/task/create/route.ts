import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { workItemId, title, details } = body;

    const dateStart = details[0].date;
    const dateEnd = details[details.length - 1].date;

    // data를 예시로 만들어 둔걸 사용하고 있기 때문에
    // 나중에 바꿔줘야함.

    const work_ItemId = 3;

    const findData = await prisma.workItem.findUnique({
      where: {
        id: work_ItemId, // (테스트중)workItemId로 변경 예정
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

    const newTask = details.map((detail: { date: string; text: string }) => {
      return {
        text: detail.text,
        date: new Date(detail.date),
        timeLineId: newTimeLine.id,
      };
    });

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
      newTask: "hi",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Something went wrong" });
  }
}
