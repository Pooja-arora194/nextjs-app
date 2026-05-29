// import { NextResponse } from "next/server";

// export function proxy(request) {
//   const token =
//     request.cookies.get(
//       "token"
//     )?.value;

//   const googleToken =
//     request.cookies.get(
//       "next-auth.session-token"
//     ) ||
//     request.cookies.get(
//       "__Secure-next-auth.session-token"
//     );

//   const pathname =
//     request.nextUrl.pathname;

//   const isLoggedIn =
//     token || googleToken;


//   if (
//     isLoggedIn &&
//     (pathname === "/login" ||
//       pathname === "/register")
//   ) {
//     return NextResponse.redirect(
//       new URL(
//         "/dashboard",
//         request.url
//       )
//     );
//   }

//   // Non logged in user
//   // cannot access protected routes
//   if (
//     !isLoggedIn &&
//     (pathname.startsWith(
//       "/dashboard"
//     ) ||
//       pathname.startsWith(
//         "/profile"
//       ))
//   ) {
//     return NextResponse.redirect(
//       new URL(
//         "/login",
//         request.url
//       )
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/register",
//     "/dashboard/:path*",
//     "/profile/:path*",
//   ],
// };
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
  // JWT token
  const token =
    req.cookies.get("token")?.value;

  // NextAuth session token
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
  // Logged-in user login/register page open na kar sake
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

  // Protected routes
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