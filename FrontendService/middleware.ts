export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Protect these paths by default; adjust as needed
    "/reviews/:path*",
    "/analytics/:path*",
    "/locations/:path*",
    "/team/:path*",
    "/whitelabel/:path*",
    "/settings/:path*"
  ],
};
