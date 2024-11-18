"use server";

import prisma from "@/lib/prisma";

export async function addWorkItem(formData: FormData, goalId: number) {
  const data = {
    title: formData.get("title") as string,
  };
  const newWorkItem = await prisma.workItem.create({
    data: {
      title: data.title,
      goalId,
    },
    select: {
      id: true,
    },
  });
  console.log(newWorkItem);
}
