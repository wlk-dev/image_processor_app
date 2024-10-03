import React from 'react';
import { ImageListProps } from '../types/types'

const ImageList: React.FC<ImageListProps> = ({ images, onSelectImage }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className="m-2 cursor-pointer text-center"
            onClick={() => onSelectImage(image, index)}
          >
            <img
              src={image.paramUrl || image.url}
              alt={image.name}
              className="block max-w-[300px] max-h-[300px] rounded-lg shadow-lg"
            />
            <p className="mt-2 text-sm text-gray-600">{image.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ImageList;
