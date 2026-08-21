import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Hacker House Goa | Voice RAG System",
  description: "Terminal-speed voice RAG with tropical vibes. Speak Hindi, Marathi, or English — get grounded answers in sub-200ms. Built at Hacker House Goa.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23141a1c'/><text x='15' y='35' font-family='monospace' font-size='24' fill='%2300ffaa'>&gt;</text><path d='M45 45 Q40 30 35 20 Q40 25 45 35 Z M45 45 Q50 30 55 20 Q50 25 45 35 Z' fill='%23ff6b35' opacity='0.8'/><rect x='65' y='50' width='20' height='3' rx='1.5' fill='%2300ffaa'/><rect x='65' y='58' width='15' height='3' rx='1.5' fill='%2300d9ff'/><rect x='65' y='66' width='18' height='3' rx='1.5' fill='%2300ffaa'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0e0f] text-[#e0ffef] font-sans">
        {children}
      </body>
    </html>
  );
}
