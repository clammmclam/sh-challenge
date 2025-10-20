import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import ThemeProviderWrapper from "./api/ThemeProviderWrapper";
import StyledComponentsRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
