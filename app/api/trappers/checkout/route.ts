import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const phone = (formData.get("phone") as string) || null;
  const quantity = Number(formData.get("quantity"));
  const date = new Date(formData.get("date") as string);

  const settings = await prisma.appSettings.findFirst();

  if (!settings) {
    return NextResponse.json(
      { error: "App settings not found" },
      { status: 500 },
    );
  }

  // Validate before making any changes
  if (quantity > settings.totalTrappers) {
    return NextResponse.json(
      {
        error: "Not enough trappers available.",
      },
      {
        status: 400,
      },
    );
  }

  await prisma.$transaction(async (tx) => {
    const borrower = await tx.borrower.findFirst({
      where: {
        name,
      },
    });

    if (borrower) {
      await tx.borrower.update({
        where: {
          id: borrower.id,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
    } else {
      await tx.borrower.create({
        data: {
          name,
          phone,
          quantity,
        },
      });
    }

    await tx.appSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        totalTrappers: {
          decrement: quantity,
        },
      },
    });

    await tx.trapperTransaction.create({
      data: {
        type: "checkout",
        name,
        phone,
        quantity,
        date,
      },
    });
  });

  return NextResponse.json({
    success: true,
  });
}
