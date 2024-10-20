import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const product = await prisma.product.findMany({
      orderBy: {
        productId: "desc",
      },
      take: 8,
    });

    if (product) {
      return NextResponse.json(product, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching NFT:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
