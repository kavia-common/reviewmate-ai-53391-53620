"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * PUBLIC_INTERFACE
 * Providers
 * A client-only wrapper that mounts global React Context providers for the app.
 * - Wraps NextAuth SessionProvider
 * - Wraps TanStack QueryClientProvider and DevTools
 *
 * Usage:
 *   Place <Providers>{children}</Providers> inside a Server Component (e.g., root layout).
 *   This ensures React Context is created only on the client while being composed from server components.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a single QueryClient instance for the app lifecycle on the client.
  // useRef-like pattern with useState initializer to avoid recreating between renders.
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
