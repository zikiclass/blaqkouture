import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    // Use req.nextUrl instead of req.url

    const url = new URL(req.url);
    const newsId = url.searchParams.get("id");
    const id = parseInt(newsId, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (news) {
      return NextResponse.json(news, { status: 200 });
    } else {
      return NextResponse.json({ message: "news not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
