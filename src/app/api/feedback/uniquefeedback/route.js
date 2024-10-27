import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    // Use req.nextUrl instead of req.url

    const url = new URL(req.url);
    const feedbackId = url.searchParams.get("id");
    const id = parseInt(feedbackId, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id },
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
    console.error("Error fetching Feedback:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
