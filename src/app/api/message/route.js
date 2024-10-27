import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    // Create new cart
    const addMessage = await prisma.message.create({
      data: {
        message: body.message,
        name: body.name,
        email: body.email,
        subject: body.subject,
      },
    });

    return NextResponse.json(addMessage, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}

export async function GET(req) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (messages) {
      return NextResponse.json(messages, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Messages not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const messageId = req.nextUrl.searchParams.get("messageId");
    const id = parseInt(messageId);
    const msgDelete = await prisma.message.delete({
      where: {
        id,
      },
    });
    if (msgDelete) return NextResponse.json("success", { status: 200 });
    return NextResponse.json("error", { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
