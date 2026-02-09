import type { ReactNode } from "react";

export async function generateStaticParams() {
  return [];
}

export default async function CodeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
