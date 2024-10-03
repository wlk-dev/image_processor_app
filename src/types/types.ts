type P = 'w' | 'h' | 'fit' | 'auto';

type BasicParams = {
    [p in P]: string | number;
}

export type ImageParams = BasicParams & {
    flip?: 'hv' | 'h' | 'v';
    orient?: number;
    rot?: number;
}

export type Image = {
    url: string;
    name: string;
    params: ImageParams;
    paramUrl?: string;
}

export type Index = number;

export type ImageListProps = {
    images: Image[];
    onSelectImage: (image: Image, index: Index) => void;
}