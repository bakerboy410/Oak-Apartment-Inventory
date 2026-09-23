import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const variant = await prisma.variant.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!variant) {
      return NextResponse.json(
        {
          error: "Variant not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(variant);
  } catch (error) {
    console.error("GET VARIANT ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load variant",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { name, hasQuantity, quantity, unit } = await request.json();

    const variant = await prisma.variant.update({
      where: {
        id,
      },
      data: {
        name,
        hasQuantity,
        quantity: hasQuantity ? quantity : null,
        unit: hasQuantity ? unit : null,
      },
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.error("UPDATE VARIANT ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to update variant",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
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
      },
    );
  }
}
