'use client';
import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function Tip({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8">
            <div className="relative rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden">
                {/* Gradient background subtle */}
                <div className="absolute inset-0 bg-gradient-to-br from-cfr-primary/5 via-transparent to-cfr-primary/3 pointer-events-none" />
                
                {/* Accent border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
                
                <div className="relative flex items-start gap-4">

                    <div className="flex-1">
                        <div className="text-sm font-semibold text-cfr-primary mb-2 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-cfr-primary" />
                            <span>Conseil d'expert</span>
                        </div>
                        <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


