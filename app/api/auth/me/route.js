import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]/route";

import { verifyToken } from "../../../../lib/auth";

import { readUsers } from "../../../../lib/fileDb";

export async function GET(req) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

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