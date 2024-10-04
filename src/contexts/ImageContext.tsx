import React, {createContext, useState, useEffect, ReactNode, useMemo, useCallback} from 'react';
import {Image, ImageParameters, AllowedValues, Index, FetchImageProps} from '../types/types';
import { imageService } from '../services/imageService';
import { buildImgixUrl } from '../utils/imgixUtils';

const options: AllowedValues[] = [1,2,3,4,5,6,7,8,90,180,270];

interface ImageContextProps {
    images: Image[];
    selectImage: (index: number) => void;
    selectedImageIndex: Index | null;
    updateImageParameters: (index: Index, parameters: ImageParameters) => void;
    closeModal: () => void;
    options: AllowedValues[];
    error: string | null;
}

export const ImageContext = createContext<ImageContextProps | undefined>(undefined);


const fetchImages = async ({setImages, setError, imgixParameters}: FetchImageProps) => {
    try {
        const data = await imageService();
        const initializedImages = data.map(image => ({
            ...image,
            parameters: {...imgixParameters, ...image.parameters},
            parameterUrl: buildImgixUrl(image, {...imgixParameters, ...image.parameters})
        }));
        setImages(initializedImages)
    } catch (err) {
        console.error("Error fetching images.", err);
        setError('Failed to fetch images, please try again later.')
    }
}

export const ImageProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const imgixParameters: ImageParameters = {
        w: 800,
        h: 600,
        fit: 'crop',
        auto: 'format,compress'
    };

    useEffect(() => {
        fetchImages({setImages, setError, imgixParameters});
    }, [])

    const selectImage = useCallback((index: Index) => {
        setSelectedImageIndex(index)
    }, []);

    const updateImageParameters = useCallback((index: Index, parameters: ImageParameters) => {
        setImages(prevImages => {
            const updatedImages = prevImages.map((img, idx) => {
                if (idx == index) {
                    const updatedParameterUrl = buildImgixUrl(img, parameters);
                    return {...img, parameters, parameterUrl: updatedParameterUrl};
                }
                return img;
            });
            return updatedImages;
        });
    }, []);

    const closeModal = useCallback(() => {
        setSelectedImageIndex(null);
    }, []);

    const contextValue = useMemo(() => ({
        images,
        selectImage,
        selectedImageIndex,
        updateImageParameters,
        closeModal,
        options,
        error,
    }), [images, selectedImageIndex, updateImageParameters, selectImage, closeModal, error]);

    return (
        <ImageContext.Provider value={contextValue}>
            {children}
        </ImageContext.Provider>
    )
}