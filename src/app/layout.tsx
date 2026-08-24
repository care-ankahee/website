import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ankahee — Online Therapy & Counselling",
  description: "At Ankahee, we offer online individual and couples therapy across India, supporting people through anxiety, relationship concerns, grief, trauma, and life transitions.",
  keywords: ["online therapy india", "counselling psychology", "reetika shah therapist", "manvi jain therapist", "IFS therapy india", "CAT therapy india", "couples counselling", "mental health support"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

