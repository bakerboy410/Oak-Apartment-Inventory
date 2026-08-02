import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const phone = (formData.get("phone") as string) || null;
  const quantity = Number(formData.get("quantity"));
  const date = new Date(formData.get("date") as string);
  const legacy = formData.get("legacy") === "on";

  const settings = await prisma.appSettings.findFirst();

  if (!settings) {
    return NextResponse.json(
      { error: "App settings not found" },
      { status: 500 },
    );
  }

  await prisma.$transaction(async (tx) => {
    const borrower = await tx.borrower.findFirst({
      where: {
        name,
      },
    });

    if (!legacy) {
      if (!borrower) {
        throw new Error("Borrower not found.");
      }

      if (quantity > borrower.quantity) {
        throw new Error("Returned quantity exceeds borrowed quantity.");
      }

      const remaining = borrower.quantity - quantity;

      if (remaining === 0) {
        await tx.borrower.delete({
          where: {
            id: borrower.id,
          },
        });
      } else {
        await tx.borrower.update({
          where: {
            id: borrower.id,
          },
          data: {
            quantity: remaining,
          },
        });
      }
    }

    await tx.appSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        totalTrappers: {
          increment: quantity,
        },
      },
    });

    await tx.trapperTransaction.create({
      data: {
        type: "checkin",
        name,
        phone,
        quantity,
        date,
        legacy,
      },
    });
  });

  return NextResponse.json({
    success: true,
  });
}
