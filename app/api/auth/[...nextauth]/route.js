import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

async function refreshAccessToken(
  token
) {
  try {
    const response =
      await axios.post(
        "https://oauth2.googleapis.com/token",
        new URLSearchParams({
          client_id:
            process.env
              .GOOGLE_CLIENT_ID,
          client_secret:
            process.env
              .GOOGLE_CLIENT_SECRET,
          grant_type:
            "refresh_token",
          refresh_token:
            token.refreshToken,
        }),
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

    const refreshedTokens =
      response.data;

    return {
      ...token,
      accessToken:
        refreshedTokens.access_token,
      accessTokenExpires:
        Date.now() +
        refreshedTokens.expires_in *
          1000,
      refreshToken:
        refreshedTokens.refresh_token ??
        token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error:
        "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env
          .GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type:
            "offline",
          response_type:
            "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      account,
    }) {
      // First Login
      if (account) {
        return {
          ...token,
          accessToken:
            account.access_token,
          accessTokenExpires:
            Date.now() +
            account.expires_in *
              1000,
          refreshToken:
            account.refresh_token,
        };
      }

      // Token valid
      if (
        Date.now() <
        token.accessTokenExpires
      ) {
        return token;
      }

      // Token expired
      return refreshAccessToken(
        token
      );
    },

    async session({
      session,
      token,
    }) {
      session.error =
        token.error;

      return session;
    },
  },
};

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};