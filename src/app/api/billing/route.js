import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request) {
  try {
    const body = await request.json();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      console.error("User is not authenticated or user ID is missing");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // check if the billing exist
    const billing = await prisma.billing.findMany({
      where: {
        userId: parseInt(session?.user?.id),
      },
    });
    let addBilling;
    if (billing.length > 0) {
      addBilling = await prisma.billing.updateMany({
        where: {
          userId: parseInt(session?.user?.id),
        },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          state: body.state,
          streetAddress: body.streetAddress,
          townCity: body.townCity,
          phoneNumber: body.phoneNumber,
          userId: parseInt(session?.user?.id),
        },
      });
    } else {
      addBilling = await prisma.billing.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          state: body.state,
          streetAddress: body.streetAddress,
          townCity: body.townCity,
          phoneNumber: body.phoneNumber,
          userId: parseInt(session?.user?.id),
        },
      });
    }
    return NextResponse.json(addBilling, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      console.error("User is not authenticated or user ID is missing");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const billing = await prisma.billing.findMany({
      where: {
        userId: parseInt(session?.user?.id),
      },
    });

    if (billing) {
      return NextResponse.json(billing, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Billing not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching billing details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
