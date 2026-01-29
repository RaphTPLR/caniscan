'use client';
import React from 'react';

export default function Formula({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8">
            <div className="rounded-xl px-6 py-4">
                <code className="block text-center font-mono text-cfr-primary whitespace-pre-wrap text-base md:text-lg tracking-wide">{children}</code>
            </div>
        </div>
    );
}


