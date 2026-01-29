'use client';
import Image from 'next/image';
import React from 'react';

type ImgProps = React.ComponentProps<typeof Image> & { caption?: string };

export default function Img({ caption, ...props }: ImgProps) {
    return (
        <figure className="my-10">
            <Image {...props} className={`rounded-xl border border-border shadow-sm ${props.className ?? ''}`} />
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
            )}
        </figure>
    );
}


