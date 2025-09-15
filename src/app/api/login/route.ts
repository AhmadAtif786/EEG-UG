import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoodb";
import User from "@/lib/usermodal";
import Member from "@/lib/membermodal";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // use env in production

function generateToken(user: any) {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" } // token expires in 7 days
  );
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, createPassword, step } = await req.json();

    // --- Step 1: Email Check ---
    if (step === "emailCheck") {
      const user = await User.findOne({ email });
      if (user) {
        return NextResponse.json({
          success: true,
          mode: "login",
          message: "User exists. Please enter your password.",
        });
      }

      const member = await Member.findOne({ email });
      if (member) {
        return NextResponse.json({
          success: true,
          mode: "createPassword",
          message: "Member found. Please create a password to complete signup.",
        });
      }

      return NextResponse.json(
        { success: false, message: "No account found with this email." },
        { status: 404 }
      );
    }

    // --- Step 2a: Login flow ---
    if (step === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found." },
          { status: 404 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Invalid password" },
          { status: 401 }
        );
      }

      const token = generateToken(user);

      return NextResponse.json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    }

    // --- Step 2b: Create password flow ---
    if (step === "createPassword") {
      const member = await Member.findOne({ email });
      if (!member) {
        return NextResponse.json(
          { success: false, message: "Member not found." },
          { status: 404 }
        );
      }

      if (!createPassword) {
        return NextResponse.json(
          { success: false, message: "Password is required." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(createPassword, 10);

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      const token = generateToken(newUser);

      return NextResponse.json({
        success: true,
        message: "Account created and login successful",
        token,
        user: newUser,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid request step." },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
