import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request) {
  try {
    const admin = await prisma.bankDetails.findMany();

    if (admin) {
      return NextResponse.json(admin, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json({ status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const updateBank = await prisma.bankDetails.update({
      where: { id: parseInt(body.id) },
      data: {
        accountNumber: body.accountNumber,
        accountName: body.accountName,
      },
    });

    return NextResponse.json(updateBank, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
