import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Becoming Him',
  description: 'Documenting the 75 Hard journey with honesty, discipline, and recovery.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
