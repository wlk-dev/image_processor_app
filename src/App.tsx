import React, { useEffect, useState } from 'react';
import ImageList from './components/ImageList';
import { Image } from './types/types'
import { imageService } from './services/imageService';
import { buildImgixUrl } from './utils/imgixUtils';

interface FetchImagesProps {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const fetchImages = async ({ setImages, setError }: FetchImagesProps): Promise<void> => {
  try {
    const data = await imageService();
    setImages(data);
  } catch (err) {
    console.error('Error fetching images.', err);
    setError('Failed to fetch images. Please try again later.');
  }
};

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    fetchImages({setImages, setError});
  }, []);

  const handleSelectImage = (image: Image) => {
    setSelectedImage(image);
    console.log('Selected Image:', image);
    // TODO: open modal for image operations
  };

  return (
    <div className="p-5 max-w-screen-xl mx-auto font-sans">
      <h1 className="text-center text-2xl font-semibold text-gray-800">Image Gallery</h1>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <ImageList images={images} onSelectImage={handleSelectImage} />

      {selectedImage && (
        <div className="mt-10 text-center">
          <h2 className="text-xl text-gray-700">Selected Image:</h2>
          <img
            src={buildImgixUrl(selectedImage.url, {
              w: 600,
              h: 400,
              fit: 'max',
              auto: 'format,compress',
            })}
            alt={selectedImage.name}
            className="block max-w-full h-auto rounded-lg shadow-lg mx-auto mt-5"
          />
          <p className="mt-3 text-lg text-gray-600">{selectedImage.name}</p>
        </div>
      )}
    </div>
  );
};

export default App;
