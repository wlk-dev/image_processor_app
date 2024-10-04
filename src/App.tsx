import React, { useContext } from 'react';
import ImageList from './components/ImageList';
import ImageModal from './components/ImageModal';
import { ImageContext } from './contexts/ImageContext';

const App: React.FC = () => {
  const imageContext = useContext(ImageContext);

  if (!imageContext) {
    return <div>Loading...</div>; // Or a fallback UI
  }

  const { images, selectedImageIndex, closeModal, error } = imageContext;

  return (
    <div className="p-5 max-w-screen-xl mx-auto font-sans">
      <h1 className="text-center text-2xl font-semibold text-gray-800">Image Gallery</h1>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <ImageList />

      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <div id="modal" className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center">
          <button
            className='fixed z-90 top-6 right-8 text-white text-5xl font-bold hover:cursor-pointer'
            onClick={closeModal}
            aria-label="Close Modal"
          >
            &times;
          </button>
          <div>
            <ImageModal
              image={images[selectedImageIndex]}
              index={selectedImageIndex}
              options={imageContext.options}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
