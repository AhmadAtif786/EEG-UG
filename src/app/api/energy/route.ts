// app/api/energy/rawdata/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // ⚠️ Use env var in production

export async function POST(req: Request) {
  try {
    // 🔑 Extract token
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { start, end, ecId, cps, agg } = body;

    // Build query string for aggregation
    const query = agg ? `?f=agg(${agg})` : "";

    const res = await fetch(
      `https://eegfaktura.at/energystore/query/rawdata${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant": process.env.EEG_TENANT!, // RC-ID
          Authorization: `Basic ${Buffer.from(
            `${process.env.EEG_USER}:${process.env.EEG_PASS}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({ ecId, cps, start, end }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
