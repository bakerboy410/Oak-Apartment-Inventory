import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const borrowerId = (formData.get("borrowerId") as string) || null;
  const name = formData.get("name") as string;
  const phone = (formData.get("phone") as string) || null;
  const quantity = Number(formData.get("quantity"));
  const date = formData.get("date") as string;

  if (!name || !quantity || quantity < 1 || !date) {
    return NextResponse.json(
      {
        error: "Invalid checkout information.",
      },
      {
        status: 400,
      },
    );
  }

  const transactionDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(transactionDate.getTime())) {
    return NextResponse.json(
      {
        error: "Invalid transaction date.",
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

  let borrower;

  if (borrowerId) {
    borrower = await prisma.borrower.findUnique({
      where: {
        id: borrowerId,
      },
    });

    if (!borrower) {
      return NextResponse.json(
        {
          error: "Borrower not found.",
        },
        {
          status: 404,
        },
      );
    }

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
    borrower = await prisma.borrower.findFirst({
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
      borrower = await prisma.borrower.create({
        data: {
          name,
          phone,
          quantity,
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
        decrement: quantity,
      },
    },
  });

  await prisma.trapperTransaction.create({
    data: {
      type: "checkout",
      name: borrower.name,
      phone: phone,
      quantity,
      date: transactionDate,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
