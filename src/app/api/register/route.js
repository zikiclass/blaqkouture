import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { userSchema } from "../../validationSchema";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate passwords
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { message: "Password mismatch" },
        { status: 400 }
      );
    }

    // Validate input data
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation error", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (checkEmail) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const date_created = new Date();

    // Create new user
    const addUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: hashedPassword,
        date: date_created,
      },
    });

    return NextResponse.json(addUser, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}
