import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    // Use req.nextUrl instead of req.url
    const productId = req.nextUrl.searchParams.get("productId");
    const id = parseInt(productId, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { productId: id },
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
