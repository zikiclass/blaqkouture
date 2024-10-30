import { Resend } from "resend";
import WelcomeTemplate from "../../../../emails/WelcomeTemplate";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST() {
  await resend.emails.send({
    from: "info@blaqkouture.com",
    to: "rosafetrade@gmail.com",
    subject: "Welcome Email",
    react: <WelcomeTemplate name="Ziki" />,
  });
  return NextResponse.json({ message: "Ok" });
}
