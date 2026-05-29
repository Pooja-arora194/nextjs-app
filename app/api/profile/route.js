import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";

import { verifyToken } from "../../../lib/auth";

import {
  readUsers,
  writeUsers,
} from "../../../lib/fileDb";

export async function GET(req) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    // Google User
    if (session?.user) {
      return NextResponse.json({
        success: true,
        user: {
          name:
            session.user.name,
          email:
            session.user.email,
          image:
            session.user.image,
          provider:
            "google",
        },
      });
    }

    // JWT User
    const token =
      req.cookies.get("token")
        ?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const decoded =
      verifyToken(token);

    const users =
      readUsers();

    const user =
      users.find(
        (u) =>
          u.id === decoded.id
      );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: "jwt",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  try {
    const session =
      await getServerSession(authOptions);

    // Google users ko update nahi karne dena
    if (session?.user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google users cannot update profile from here",
        },
        { status: 400 }
      );
    }

    const token =
      req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded =
      verifyToken(token);

    const { name, email } =
      await req.json();

    const users =
      readUsers();

    const userIndex =
      users.findIndex(
        (u) =>
          u.id === decoded.id
      );

    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User not found",
        },
        { status: 404 }
      );
    }

    // Email duplicate check
    const emailExists =
      users.find(
        (u) =>
          u.email === email &&
          u.id !== decoded.id
      );

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already exists",
        },
        { status: 400 }
      );
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
    };

    writeUsers(users);

    return NextResponse.json({
      success: true,
      message:
        "Profile updated successfully",
      user: users[userIndex],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}