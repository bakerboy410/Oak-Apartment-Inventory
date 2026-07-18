import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const phone = (formData.get("phone") as string) || null;
  const quantity = Number(formData.get("quantity"));
  const date = new Date(formData.get("date") as string);

  const borrower = await prisma.borrower.findFirst({
    where: {
      name,
    },
  });

  if (borrower) {
    await prisma.borrower.update({
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
    await prisma.borrower.create({
      data: {
        name,
        phone,
        quantity,
      },
    });
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
        decrement: quantity,
      },
    },
  });

  await prisma.trapperTransaction.create({
    data: {
      type: "checkout",
      name,
      phone,
      quantity,
      date,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
