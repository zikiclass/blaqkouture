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
        img1: body.img1,
        img2: body.img2,
        img3: body.img3,
        collection: body.collection,
        associatedWith: body.associatedWith,
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

export async function PUT(request) {
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

    const updateProduct = await prisma.product.update({
      where: { productId: parseInt(body.id) },
      data: {
        title: body.title,
        price: parseFloat(body.price),
        overprice: parseFloat(body.overprice),
        details: body.details,
        stockquantity: body.stockquantity,
        collection: body.collection,
        associatedWith: body.associatedWith,
      },
    });

    return NextResponse.json(updateProduct, { status: 201 });
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
    const product = await prisma.product.findMany({
      orderBy: {
        productId: "desc",
      },
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
    console.error("Error fetching product:", error);
    return NextResponse.json(body.email, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");
    const id = parseInt(productId);
    const productDelete = await prisma.product.delete({
      where: {
        productId: id,
      },
    });
    if (productDelete) return NextResponse.json("success", { status: 200 });
    return NextResponse.json("error", { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
