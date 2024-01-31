import { Inter } from "next/font/google";

import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { FirebaseAuthProvider } from "@/providers/firebase-auth-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "E-Commerce Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider />
            {children}
          </ThemeProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
