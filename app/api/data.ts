import prisma from "@/lib/prisma";

export interface IGoal {
  id: number;
  title: string;
  description: string | null;
  period: number;
}

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

export interface IWorkItem {
  id: number;
  title: string;
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
