export interface Image {
    id?: string; 
    url: string;
    name: string;
}

export interface ImageListProps {
    images: Image[];
    onSelectImage: (image: Image) => void;
}
