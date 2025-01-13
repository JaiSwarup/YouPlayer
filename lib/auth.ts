import { db } from "@/lib/db";
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Provider } from "next-auth/providers";
// import { eq } from "drizzle-orm";
import { User, users } from "@/schema/users";
import { accounts, sessions, verificationTokens } from "@/schema/auth-tables";
import { Adapter } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";
import Google from "next-auth/providers/google";


const adapter = {
  ...(DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter),
  createUser: async (data: User) => {
    const newUser = {
      id: createId(),
      email: data.email,
      name: data.name,
      image: data.image,
      emailVerified: data.emailVerified,
      role: "user"
    };

    await db.insert(users).values(newUser);
    return newUser;
  },
};

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        access_type: "offline",
        prompt: "consent",
        scope: "openid profile email https://www.googleapis.com/auth/youtube.readonly", // Ensure these scopes are specified
      },
    },
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: adapter,
  session: {
    strategy: "jwt",
  },
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token; // Add access token from the account object
        token.accessToken = account.refresh_token; // Add access token from the account object
      }
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      console.log("Account object:", account);
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      // session.accessToken = token.accessToken as string; // Pass access token to the session
      return {...session, accessToken : token.accessToken, refreshToken : token.refreshToken};
    },
  },
})