import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const quantity = Number(formData.get("quantity"));
  const legacy = formData.get("legacy") === "on";

  if (!name || !quantity || quantity < 1) {
    return NextResponse.json(
      {
        error: "Invalid check-in information.",
      },
      {
        status: 400,
      },
    );
  }

  const settings = await prisma.appSettings.findFirst();

  if (!settings) {
    return NextResponse.json(
      {
        error: "App settings not found",
      },
      {
        status: 500,
      },
    );
  }

  const borrower = await prisma.borrower.findFirst({
    where: {
      name,
    },
  });

  if (borrower) {
    const remaining = borrower.quantity - quantity;

    if (remaining <= 0) {
      await prisma.borrower.delete({
        where: {
          id: borrower.id,
        },
      });
    } else {
      await prisma.borrower.update({
        where: {
          id: borrower.id,
        },
        data: {
          quantity: remaining,
        },
      });
    }
  }

  await prisma.appSettings.update({
    where: {
      id: settings.id,
    },
    data: {
      totalTrappers: {
        increment: quantity,
      },
    },
  });

  await prisma.trapperTransaction.create({
    data: {
      type: "checkin",
      name,
      phone: null,
      quantity,
      date: new Date(),
      legacy,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
