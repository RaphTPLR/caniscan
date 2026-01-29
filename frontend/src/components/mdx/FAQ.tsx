'use client';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
    defaultOpen?: boolean;
}

function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-border/50 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left bg-card hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between gap-4 cursor-pointer"
            >
                <span className="font-medium text-foreground text-sm md:text-base">{question}</span>
                <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                    }`} 
                />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 py-4 bg-card/50 border-t border-border/30">
                    <div className="text-sm leading-relaxed text-muted-foreground">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FAQProps {
    title?: string;
    children: React.ReactNode;
}

export default function FAQ({ title = "Questions fréquentes", children }: FAQProps) {
    return (
        <div className="my-12">
            <div className="mb-8">
                <div className="mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                    Retrouvez les réponses aux questions les plus courantes sur ce sujet.
                </p>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

export { FAQItem };
