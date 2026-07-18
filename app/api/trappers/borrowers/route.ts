import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const borrowers = await prisma.borrower.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(borrowers);
}
