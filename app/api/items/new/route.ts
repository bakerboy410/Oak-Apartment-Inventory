import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description, store, hasQuantity, quantity, unit, image } =
    await request.json();

  await prisma.item.create({
    data: {
      name,
      description,
      store,
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
  });

  return NextResponse.json({
    success: true,
  });
}
