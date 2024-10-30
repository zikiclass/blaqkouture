import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      console.error("User is not authenticated or user ID is missing");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orderId = req.nextUrl.searchParams.get("id");
    const image = req.nextUrl.searchParams.get("image");
    const id = parseInt(orderId);

    const updateOrder = await prisma.order.updateMany({
      where: { id },
      data: {
        paymentProof: image,
        status: "PROCESSING",
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
