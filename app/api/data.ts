import prisma from "@/lib/prisma";
export async function getGoal() {
  return await prisma.goal.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      period: true,
    },
  });
}

export async function getWorkItem(goalId: number) {
  return await prisma.workItem.findMany({
    where: {
      goalId,
    },
    select: {
      title: true,
      id: true,
    },
  });
}

export async function getTimeLine(workItemId: number) {
  return await prisma.timeLine.findMany({
    where: {
      workItemId,
    },
    select: {
      title: true,
    },
  });
}
