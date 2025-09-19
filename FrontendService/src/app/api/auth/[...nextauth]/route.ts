export const dynamic = "force-dynamic";
import NextAuth, { User, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import api from "@/lib/api";
import { z } from "zod";

/**
 * PUBLIC_INTERFACE
 * NextAuth configuration route.
 * This config uses a Credentials provider that calls the backend /auth/login endpoint.
 * Returns a JWT with accessToken and user profile data for client use.
 */
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type BackendLoginResponse = {
  user: {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role?: string | null;
  };
  accessToken: string;
};

type UserWithAccessToken = User & { accessToken: string };

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        try {
          const { data } = await api.post<BackendLoginResponse>("/auth/login", parsed.data);
          // Expected backend response: { user: {...}, accessToken: "..." }
          if (data?.accessToken && data?.user) {
            const u: UserWithAccessToken = {
              id: data.user.id,
              name: data.user.name ?? undefined,
              email: data.user.email,
              image: data.user.image ?? undefined,
              accessToken: data.accessToken,
            };
            return u;
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as UserWithAccessToken).accessToken) {
        const u = user as UserWithAccessToken;
        const userPayload = { id: u.id, name: u.name ?? null, email: u.email ?? null, image: u.image ?? null };
        // attach structured fields onto token
        (token as unknown as { user?: typeof userPayload }).user = userPayload;
        (token as unknown as { accessToken?: string }).accessToken = u.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as unknown as { user?: { id?: string; name?: string | null; email?: string | null; image?: string | null }; accessToken?: string };
      if (t.user) {
        session.user = t.user;
      }
      if (t.accessToken) {
        (session as { accessToken?: string }).accessToken = t.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
