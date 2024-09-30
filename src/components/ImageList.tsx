import React from 'react';
import { ImageListProps } from '../types/types'
import { buildImgixUrl } from '../utils/imgixUtils';

const ImageList: React.FC<ImageListProps> = ({ images, onSelectImage }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {images.map((image, index) => {
        const imgixParams = {
          w: 300,
          h: 300,
          fit: 'crop',
          auto: 'format,compress',
        };

        const optimizedUrl = buildImgixUrl(image.url, imgixParams);

        return (
          <div
            key={image.id || index}
            className="m-2 cursor-pointer text-center"
            onClick={() => onSelectImage(image)}
          >
            <img
              src={optimizedUrl}
              alt={image.name}
              className="block w-full h-auto rounded-lg shadow-lg"
            />
            <p className="mt-2 text-sm text-gray-600">{image.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ImageList;
