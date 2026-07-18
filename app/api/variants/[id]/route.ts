import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.variant.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("DELETE VARIANT ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to delete variant",
      },
      {
        status: 500,
      }
    );
  }
}
