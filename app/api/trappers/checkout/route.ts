import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const settings = await prisma.appSettings.findFirst();

  if (!settings) {
    return NextResponse.json({ error: "Settings not found" }, { status: 500 });
  }

  if (settings.totalTrappers < body.quantity) {
    return NextResponse.json(
      { error: "Not enough trappers available." },
      { status: 400 },
    );
  }

  await prisma.trapperTransaction.create({
    data: {
      type: "checkout",
      name: body.name,
      phone: body.phone || null,
      quantity: body.quantity,
    },
  });

  await prisma.appSettings.update({
    where: {
      id: settings.id,
    },
    data: {
      totalTrappers: {
        decrement: body.quantity,
      },
    },
  });

  return NextResponse.json({
    success: true,
  });
}
