"use client";

import Link from "next/link";

type BackLinkProps = {
  sectionId?: string;
  children: React.ReactNode;
  className?: string;
};

export default function BackLink({
  sectionId = "tests",
  children,
  className,
}: BackLinkProps) {
  return (
    <Link href={`/?section=${sectionId}`} className={className} prefetch>
      {children}
    </Link>
  );
}
