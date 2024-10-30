import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req) {
  try {
    const orderId = req.nextUrl.searchParams.get("id");
    const status = req.nextUrl.searchParams.get("status");
    const id = parseInt(orderId);

    const updateOrder = await prisma.order.updateMany({
      where: { id },
      data: {
        status,
      },
    });

    return NextResponse.json(updateOrder, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
