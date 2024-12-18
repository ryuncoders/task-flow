import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IDelete {
  success: boolean;
  message?: string;
  details?: string;
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    await prisma.timeLine.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "TimeLine deleted successfully",
      } as IDelete,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting TimeLine:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete TimeLine",
        details: error,
      },
      { status: 500 }
    );
  }
}
