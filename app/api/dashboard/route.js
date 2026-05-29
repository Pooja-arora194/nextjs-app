import { NextResponse } from "next/server";

import { verifyToken } from "../../../lib/auth";

import { readUsers } from "../../../lib/fileDb";

export async function GET(req) {
  try {
    const token =
      req.cookies.get("token");

    const googleToken =
      req.cookies.get(
        "next-auth.session-token"
      ) ||
      req.cookies.get(
        "__Secure-next-auth.session-token"
      );

    if (googleToken) {
      const users =
        readUsers();

      return NextResponse.json({
        success: true,

        stats: {
          totalUsers:
            users.length,

          activeUsers:
            users.length,

          pendingUsers: 0,
        },

        users: users.map(
          (user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        ),
      });
    }

    if (!token) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    verifyToken(
      token.value
    );

    const users =
      readUsers();

    return NextResponse.json({
      success: true,

      stats: {
        totalUsers:
          users.length,

        activeUsers:
          users.length,

        pendingUsers: 0,
      },

      users: users.map(
        (user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      ),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}
