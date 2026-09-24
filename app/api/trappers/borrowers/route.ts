import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const borrowers = await prisma.borrower.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const borrowersWithLatestCheckout = await Promise.all(
    borrowers.map(async (borrower) => {
      const latestCheckout = await prisma.trapperTransaction.findFirst({
        where: {
          name: borrower.name,
          type: "checkout",
        },
        orderBy: {
          date: "desc",
        },
      });

      return {
        ...borrower,
        latestCheckoutDate: latestCheckout
          ? latestCheckout.date.toISOString().split("T")[0]
          : null,
      };
    }),
  );

  return NextResponse.json(borrowersWithLatestCheckout);
}
