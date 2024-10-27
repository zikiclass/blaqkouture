import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    // Create new cart
    const addNews = await prisma.news.create({
      data: {
        headline: body.headline,
        content1: body.content1,
        content2: body.content2,
        content3: body.content3,
        date: body.date,
        image: body.img1,
      },
    });

    return NextResponse.json(addNews, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}

export async function GET(req) {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        id: "desc",
      },
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

export async function DELETE(req) {
  try {
    const newsId = req.nextUrl.searchParams.get("id");
    const id = parseInt(newsId, 10);
    const newsDelete = await prisma.news.delete({
      where: {
        id,
      },
    });
    if (newsDelete) return NextResponse.json("success", { status: 200 });
    return NextResponse.json("error", { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const updatenews = await prisma.news.update({
      where: { id: parseInt(body.id) },
      data: {
        headline: body.headline,
        content1: body.content1,
        content2: body.content2,
        content3: body.content3,
        date: body.date,
      },
    });

    return NextResponse.json(updatenews, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
