import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const item = await prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        variants: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!item) {
      return NextResponse.json(
        {
          error: "Item not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("GET ITEM ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load item",
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

    const { name, description, store, hasQuantity, quantity, unit } =
      await request.json();

    const item = await prisma.item.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        store,
        hasQuantity,
        quantity: hasQuantity ? quantity : null,
        unit: hasQuantity ? unit : null,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("UPDATE ITEM ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to update item",
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

    await prisma.item.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE ITEM ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to delete item",
      },
      {
        status: 500,
      },
    );
  }
}
