import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const quantity = Number(formData.get("quantity"));
  const date = formData.get("date") as string | null;
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

  if (!legacy && !date) {
    return NextResponse.json(
      {
        error: "Check-in date is required.",
      },
      {
        status: 400,
      },
    );
  }

  const transactionDate = legacy ? new Date() : new Date(`${date}T12:00:00`);

  if (Number.isNaN(transactionDate.getTime())) {
    return NextResponse.json(
      {
        error: "Invalid check-in date.",
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

  if (!legacy && !borrower) {
    return NextResponse.json(
      {
        error: "Borrower not found.",
      },
      {
        status: 404,
      },
    );
  }

  if (!legacy && borrower && quantity > borrower.quantity) {
    return NextResponse.json(
      {
        error: `${borrower.name} only has ${borrower.quantity} trappers checked out.`,
      },
      {
        status: 400,
      },
    );
  }

  if (!legacy && borrower) {
    const latestCheckout = await prisma.trapperTransaction.findFirst({
      where: {
        name: borrower.name,
        type: "checkout",
      },
      orderBy: {
        date: "desc",
      },
    });

    if (latestCheckout && transactionDate < latestCheckout.date) {
      const checkoutDate = latestCheckout.date.toLocaleDateString();

      return NextResponse.json(
        {
          error: `Check-in date cannot be earlier than the latest checkout date (${checkoutDate}).`,
        },
        {
          status: 400,
        },
      );
    }
  }

  if (borrower) {
    const remaining = borrower.quantity - quantity;

    if (remaining === 0) {
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
      date: transactionDate,
      legacy,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
