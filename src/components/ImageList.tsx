import React, { useContext } from 'react';
import { ImageContext } from '../contexts/ImageContext';

const ImageList: React.FC = () => {
  const imageContext = useContext(ImageContext);

  if (!imageContext) {
    return null; // Or a fallback UI
  }

  const { images, selectImage } = imageContext;

  return (
    <div className="flex flex-wrap justify-center">
      {images.map((image, index) => (
        <div
          key={index}
          className="m-2 cursor-pointer text-center"
          onClick={() => selectImage(index)}
        >
          <img
            src={image.parameterUrl}
            alt={image.name}
            className="block max-w-[300px] max-h-[300px] rounded-lg shadow-lg"
          />
          <p className="mt-2 text-sm text-gray-600">{image.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
