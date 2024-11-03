import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"; // Adjust the import according to your folder structure

export async function GET(request) {
  try {
    const bankDetails = await prisma.bankDetails.findMany();
    return NextResponse.json(bankDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching bank details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const updatedBankDetails = await prisma.bankDetails.update({
      where: { id: parseInt(body.id) },
      data: {
        accountNumber: body.accountNumber,
        accountName: body.accountName,
      },
    });

    return NextResponse.json(updatedBankDetails, { status: 200 });
  } catch (error) {
    console.error("Error updating bank details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
