export { default } from "next-auth/middleware";

// Configure which routes require auth
export const config = {
  matcher: ["/dashboard/:path*", "/reviews/:path*", "/analytics/:path*", "/team/:path*", "/settings/:path*"],
};
