import { NextResponse } from "next/server";
import {
  readUsers,
  writeUsers,
} from "../../../../lib/fileDb";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    const users = readUsers();

    const existingUser = users.find(
      (u) => u.email === email
    );

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    writeUsers(users);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}