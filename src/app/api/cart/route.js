import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    // Create new cart
    const addCart = await prisma.cart.create({
      data: {
        productId: parseInt(body.productId),
        userId: parseInt(body.userId),
        phone: body.phone,
        password: hashedPassword,
        date: date_created,
      },
    });

    return NextResponse.json(addUser, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}
