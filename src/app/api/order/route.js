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

    let addOrders;

    addOrders = await prisma.order.create({
      data: {
        productId: parseInt(body.productId),
        userId: parseInt(session?.user?.id),
        quantity: parseInt(body.quantity),
        status: "NO EVIDENCE!",
        update_query: body.update_query,
      },
    });

    return NextResponse.json(addOrders, { status: 201 });
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
    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(session?.user?.id),
      },
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

export async function DELETE(req) {
  try {
    const orderId = req.nextUrl.searchParams.get("id");
    const id = parseInt(orderId);
    const orderDelete = await prisma.order.delete({
      where: {
        id,
      },
    });
    if (orderDelete) return NextResponse.json(orderDelete, { status: 200 });
    return NextResponse.json("error", { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      console.error("User is not authenticated or user ID is missing");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const update_query = req.nextUrl.searchParams.get("update_query");
    const image = req.nextUrl.searchParams.get("image");

    const updateOrder = await prisma.order.updateMany({
      where: { update_query, userId: parseInt(session?.user?.id) },
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
