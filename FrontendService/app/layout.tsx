import "../styles/globals.css";
import { ReactNode } from "react";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "ReviewMate AI",
  description: "Unified reviews, AI responses, analytics and white-label reporting",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
