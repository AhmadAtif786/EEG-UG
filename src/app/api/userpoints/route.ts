// /app/api/user-points/route.ts
import { NextResponse } from "next/server";
import Member from "@/lib/membermodal";
import { connectDB } from "@/lib/mongoodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // use env in production

export async function GET(req: Request) {
  try {
    await connectDB();

    // 🔑 Extract token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const email = decoded.email;
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing email" },
        { status: 401 }
      );
    }

    // 🔍 Lookup member in DB
    const member = await Member.findOne({ email }).lean();
    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    // Normalize supply/feed points into array of meteringPoints
    const cps = [
      ...(member.supplyPoint?.map((sp: any) => ({ meteringPoint: sp.value })) ||
        []),
      ...(member.feedPoint?.map((fp: any) => ({ meteringPoint: fp.value })) ||
        []),
    ];

    return NextResponse.json({ success: true, cps });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
