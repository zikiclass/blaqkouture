import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const status = req.nextUrl.searchParams.get("status");
    const orders = await prisma.order.findMany({
      where: { status },
      include: {
        user: true,
        product: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    if (orders) {
      return NextResponse.json(orders, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Orders not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching orders details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
