
"use client";

import {
  SessionProvider,
  useSession,
  signOut,
} from "next-auth/react";

import { useEffect } from "react";

function SessionChecker() {
  const { data: session } =
    useSession();

  useEffect(() => {
    if (
      session?.error ===
      "RefreshAccessTokenError"
    ) {
      signOut({
        callbackUrl: "/login",
      });
    }
  }, [session]);

  return null;
}

export default function SessionProviderWrapper({
  children,
}) {
  return (
    <SessionProvider
      refetchInterval={60}
      refetchOnWindowFocus={
        true
      }
    >
      <SessionChecker />
      {children}
    </SessionProvider>
  );
}