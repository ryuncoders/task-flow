"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session/get";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addGoal(prev: any, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
  };

  const session = await getSession();

  const newGoal = await prisma.goal.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      period: 1,
      userId: +session.userId!,
    },
    select: {
      id: true,
    },
  });
  if (newGoal) {
    revalidateTag("goals");
    redirect("/");
  }
}
