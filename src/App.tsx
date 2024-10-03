import React, { useEffect, useState } from 'react';
import ImageList from './components/ImageList';
import { ImageModal } from './components/ImageModal';
import { Image, Index, ImageParams } from './types/types'
import { imageService } from './services/imageService';

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
  const [selectedImage, setSelectedImage] = useState<{image: Image, index: Index} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imgixParams: ImageParams = {
    w: 800,
    h: 600,
    fit: 'crop',
    auto: 'format,compress',
  };
  

  useEffect(() => {
    fetchImages({setImages, setError});
  }, []);

  const handleSelectImage = (image: Image, index: Index) => {
    setSelectedImage({image, index});
    if (!images[index].paramUrl) {
      images[index].params = imgixParams;
    }
    console.log('Selected Image:', image);
    console.log('Selected Key:', index)
    console.log('From Images:', images);
  };

  return (
    <div className="p-5 max-w-screen-xl mx-auto font-sans">
      <h1 className="text-center text-2xl font-semibold text-gray-800">Image Gallery</h1>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <ImageList images={images} onSelectImage={handleSelectImage} />

      {selectedImage && (
        <div>
          <div id="modal" className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center">
            <a className='fixed z-90 top-6 right-8 text-white text-5xl font-bold hover:cursor-pointer' onClick={() => {
              setSelectedImage(null)
            }}>&times;</a>
            <div>
              <ImageModal images={images} index={selectedImage.index} params={imgixParams}/>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default App;
