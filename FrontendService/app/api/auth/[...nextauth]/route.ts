import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * PUBLIC_INTERFACE
 * NextAuth configuration.
 * Note: Replace the credentials provider with real providers or backend verification endpoint.
 * This placeholder validates any non-empty email/password for demo UI flow.
 */
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          // Replace with backend auth call, e.g.:
          // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {method:'POST', body: JSON.stringify(credentials)})
          // if (!res.ok) return null;
          return {
            id: "demo-user",
            name: credentials.email.split("@")[0],
            email: credentials.email,
            role: "admin"
          } as any;
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "member";
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role || "member";
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
});

export { handler as GET, handler as POST };
