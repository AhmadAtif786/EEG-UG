import Member, { IMember } from "@/lib/membermodal";
import { connectDB } from "@/lib/mongoodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData(); // ✅ instead of req.json()
    const body: any = {};
console.log(formData);
formData.forEach((value, key) => {
  if (value instanceof File) {
    body.fileName = value.name;
  } else if (key === "supplyPoint" || key === "feedPoint") {
    try {
      // Parse JSON string (from frontend)
      const arr = JSON.parse(value.toString());

      // Ensure proper format: [{ value: "..." }]
      body[key] = Array.isArray(arr)
        ? arr.map((v: any) =>
            typeof v === "string" ? { value: v } : { value: v.value }
          )
        : [];
    } catch (err) {
      console.error(`❌ Failed parsing ${key}`, err);
      body[key] = [];
    }
  } else if (key === "consentEEG" || key === "consentContract") {
    body[key] = value.toString() === "true";
  } else {
    body[key] = value.toString();
  }
});


console.log("🔥 Parsed body before save:", body);
 // Save to DB
    const member = await Member.create(body);

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Email
    await transporter.sendMail({
      from: `"EEG UG" <${process.env.EMAIL_USER}>`,
      to: body.email ?? process.env.EMAIL_RECEIVER,
      cc: process.env.EMAIL_RECEIVER,
      subject: "EEG UG Mitgliedsantrag",
      html: `
        <h3>Neuer Antrag</h3>
        <p><b>Name:</b> ${body.firstName} ${body.lastName}</p>
        <p><b>Email:</b> ${body.email}</p>
        <pre>${JSON.stringify(body, null, 2)}</pre>
      `,
    });

    return NextResponse.json({ success: true, member });
  } catch (error: unknown) {
    console.error(error);
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
