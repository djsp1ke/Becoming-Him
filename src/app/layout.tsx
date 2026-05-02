import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Becoming Him",
  description: "A website for the Becoming Him channel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <nav className="border-b border-zinc-800 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              Becoming Him
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
