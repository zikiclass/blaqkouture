import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const totalWomen = await prisma.product.count({
      where: { collection: "women" },
    });
    const totalCount = totalWomen > 8 ? 8 : totalWomen;
    const product = await prisma.product.findMany({
      where: { collection: "women" },
      orderBy: {
        productId: "desc",
      },
      take: totalCount,
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
