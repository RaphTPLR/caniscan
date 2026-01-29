'use client';
import Link from 'next/link';
import React from 'react';

type WordLinkProps = {
    href: string;
    children: React.ReactNode;
    underline?: boolean;
};

export default function WordLink({ href, children, underline = true }: WordLinkProps) {
    return (
        <Link
            href={href}
            className={`text-cfr-primary hover:text-cfr-primary/80 ${underline ? 'underline underline-offset-4' : ''}`}
        >
            {children}
        </Link>
    );
}


