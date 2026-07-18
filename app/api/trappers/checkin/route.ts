import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const phone = (formData.get("phone") as string) || null;
  const quantity = Number(formData.get("quantity"));
  const date = new Date(formData.get("date") as string);
  const legacy = formData.get("legacy") === "on";

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

  const settings = await prisma.appSettings.findFirst();

  if (!settings) {
    return NextResponse.json(
      { error: "App settings not found" },
      { status: 500 },
    );
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
      phone,
      quantity,
      date,
      legacy,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
