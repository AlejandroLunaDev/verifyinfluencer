import Link from 'next/link';
import React from 'react';

interface NavLinksProps {
  href: string;
  label: string;
}

export default function NavLinks({ href, label }: NavLinksProps) {
  return (
    <Link href={href}>
      <span className=''>{label}</span>
    </Link>
  );
}
