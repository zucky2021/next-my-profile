import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const ADMIN_USERNAME =
          process.env.ADMIN_USERNAME || "default-admin-name";
        const ADMIN_PASSWORD_HASH =
          process.env.ADMIN_PASSWORD_HASH || "default-admin-password-hash";

        console.log("ADMIN_USERNAME", ADMIN_USERNAME);
        console.log("ADMIN_PASSWORD_HASH", ADMIN_PASSWORD_HASH);

        if (
          credentials.username !== ADMIN_USERNAME ||
          credentials.password !== ADMIN_PASSWORD_HASH
        ) {
          return null;
        }

        return {
          id: "admin",
          name: ADMIN_USERNAME,
          email: "admin@example.com",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "next-auth-secret",
});

export { handler as GET, handler as POST };
