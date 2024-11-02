import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    // Create new cart
    const addFeedback = await prisma.feedback.create({
      data: {
        content: body.content,
        name: body.name,
        position: body.position,
        image: body.images,
      },
    });

    return NextResponse.json(addFeedback, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}

export async function GET(req) {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (feedback) {
      return NextResponse.json(feedback, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const feedbackId = req.nextUrl.searchParams.get("id");
    const id = parseInt(feedbackId, 10);
    const feedbackDelete = await prisma.feedback.delete({
      where: {
        id,
      },
    });
    if (feedbackDelete) return NextResponse.json("success", { status: 200 });
    return NextResponse.json("error", { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const updateFeedback = await prisma.feedback.update({
      where: { id: parseInt(body.id) },
      data: {
        name: body.name,
        content: body.content,
        position: body.position,
      },
    });

    return NextResponse.json(updateFeedback, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
