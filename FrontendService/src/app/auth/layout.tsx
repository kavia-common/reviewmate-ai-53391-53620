import type { Metadata } from "next";

/**
 * PUBLIC_INTERFACE
 * AuthLayout
 * Server Component layout for the /auth segment. Ensures the segment is recognized
 * during build-time page data collection and provides a minimal wrapper.
 */
export const metadata: Metadata = {
  title: "Sign in – ReviewMate AI",
  description: "Authenticate to access your ReviewMate AI workspace",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
