import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.trapperTransaction.create({
    data: {
      type: "checkin",
      name: body.name,
      quantity: body.quantity,
    },
  });

  const settings = await prisma.appSettings.findFirst();

  if (settings) {
    await prisma.appSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        totalTrappers: {
          increment: body.quantity,
        },
      },
    });
  }

  return NextResponse.json({
    success: true,
  });
}
