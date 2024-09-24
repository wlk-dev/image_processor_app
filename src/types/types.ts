export interface Image {
    id?: string; // Optional if not provided by apiService.ts
    url: string;
    name: string;
}

export interface ImageListProps {
    images: Image[];
    onSelectImage: (image: Image) => void;
}
