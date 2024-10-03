type Range<T extends number> = number extends T ? number :_Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;

type P = 'w' | 'h' | 'fit' | 'auto';

type BasicParams = {
    [p in P]: string | number;
}

export type ImageParams = BasicParams & {
    flip?: 'hv' | 'h' | 'v';
    orient?: 1  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 90 | 180 | 270;
    rot?: Range<359>;
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