/// <reference types="next-auth" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_BASE_URL: string;
  }
}
