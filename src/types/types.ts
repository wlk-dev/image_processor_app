import React from "react";

const FlipOptions = {
    Horizontal: 'h' as const,
    Vertical: 'v' as const,
    Both: 'hv' as const,
} as const;

type FlipOption = typeof FlipOptions[keyof typeof FlipOptions];

export type AllowedFlip = FlipOption
export type AllowedValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 90 | 180 | 270;

type P = 'w' | 'h' | 'fit' | 'auto';
type Parameters = {
    [p in P]: string | number;
}

export type ImageParameters = Parameters & {
    flip?: AllowedFlip;
    orient?: number;
    rot?: number
}

export type Image = {
    url: string;
    name: string;
    parameters: ImageParameters;
    parameterUrl?: string;
}

export type Index = number;

export type ImageListProps = {
    images: Image[];
    onSelectImage: (index: Index) => void;
}

export type ImageModalProps = {
    // image: Image;
    index: Index;
    options: AllowedValues[]
}

export type FetchImageProps = {
    setImages: React.Dispatch<React.SetStateAction<Image[]>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    imgixParameters: ImageParameters;
}