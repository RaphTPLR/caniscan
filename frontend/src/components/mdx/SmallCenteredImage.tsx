'use client';
import Image, { ImageProps } from 'next/image';
import React from 'react';

type SmallCenteredImageProps = Omit<ImageProps, 'width' | 'height'> & {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    caption?: string;
};

export default function SmallCenteredImage({ caption, width = 160, height = 160, className, ...props }: SmallCenteredImageProps) {
    return (
        <figure className="my-8 w-full flex flex-col items-center justify-center">
            <Image
                {...props}
                width={width}
                height={height}
                className={`border border-border rounded-md shadow-sm ${className ?? ''}`}
            />
            {caption && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>
            )}
        </figure>
    );
}


