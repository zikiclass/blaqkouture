import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { productSchema } from "../../validationSchema";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input data
    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation error", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Create a new product entry in the database
    const addProduct = await prisma.product.create({
      data: {
        title: body.title,
        price: parseFloat(body.price),
        overprice: parseFloat(body.overprice),
        details: body.details,
        stockquantity: body.stockquantity,
        weight: body.weight,
        img1: body.img1,
        img2: body.img2,
        img3: body.img3,
        collection: body.collection,
      },
    });

    return NextResponse.json(addProduct, { status: 201 });
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
    const product = await prisma.product.findMany();

    if (product) {
      return NextResponse.json(product, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(body.email, { status: 500 });
  }
}
