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

      {/*  */}
      {selectedImage && (
        <div>
          <div id="modal" className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center">
            <a className='fixed z-90 top-6 right-8 text-white text-5xl font-bold hover:cursor-pointer' onClick={() => {
              setSelectedImage(null)
            }}>&times;</a>
            <div>
              <img id="modal-img"
              className="max-w-[800px] max-h-[600px] object-cover" alt={selectedImage.name} src={buildImgixUrl(selectedImage.url, {
                w: 800,
                h: 600,
                fit: 'max',
                auto: 'format,compress'
                })}/>
                <div className="flex mt-1 justify-left">
                  <button className="mr-2 text-5xl hover:cursor-pointer text-white">&#8693;</button>

                  <button className="mt-2 text-5xl hover:cursor-pointer text-white transform rotate-90 ">
                    &#8693;
                  </button>
                </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default App;
