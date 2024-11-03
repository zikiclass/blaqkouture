import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    // const totalMen = await prisma.product.count({
    //   where: { collection: "men" },
    // });
    // const totalCount = totalMen > 8 ? 8 : totalMen;
    const product = await prisma.product.findMany({
      where: { collection: "men" },
      orderBy: {
        productId: "desc",
      },
      //take: totalCount,
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
