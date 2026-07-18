import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { itemId, name, hasQuantity, quantity, unit, image } = body;

    const variant = await prisma.variant.create({
      data: {
        itemId,
        name,
        hasQuantity,
        quantity: hasQuantity ? quantity : null,
        unit: hasQuantity ? unit : null,

        images: image
          ? {
              create: {
                url: image,
              },
            }
          : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.error("CREATE VARIANT ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to create variant",
      },
      {
        status: 500,
      },
    );
  }
}
