
import { NextResponse } from "next/server";

export function proxy(req) {
  const path = req.nextUrl.pathname;
console.log(
  "token:",
  req.cookies.get("token")?.value
);

console.log(
  "nextAuth:",
  req.cookies.get(
    "next-auth.session-token"
  )?.value
);
  const token =
    req.cookies.get("token")?.value;

  const nextAuthToken =
    req.cookies.get(
      "next-auth.session-token"
    )?.value ||
    req.cookies.get(
      "__Secure-next-auth.session-token"
    )?.value;

  const isAuthenticated =
    token || nextAuthToken;

    console.log(isAuthenticated,path,"isAuthenticated")
  if (
    isAuthenticated &&
    (path === "/login" ||
      path === "/register")
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        req.url
      )
    );
  }

  if (
    !isAuthenticated &&
    (path === "/dashboard" ||
      path === "/profile")
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard",
    "/profile",
  ],
};