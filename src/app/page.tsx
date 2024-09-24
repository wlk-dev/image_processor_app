'use client'

import React, { useEffect, useState } from 'react';
import ImageList from '../components/ImageList';
import { Image } from '../types/types';
import { apiService } from '../services/apiService';
import { buildImgixUrl } from '../utils/imgixUtils';


const Page: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await apiService();
        setImages(imagesData);
      } catch (err) {
        setError('Failed to fetch images. Please try again later');
      }
    };

    fetchImages();
  }, []);

  const handleSelectImage = (image: Image) => {
    setSelectedImage(image);
    console.log('Selected Image:', image);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 style={styles.subHeader}>Available Images</h2>

      {error && <p style={styles.error}>{error}</p>}

      <ImageList images={images} onSelectImage={handleSelectImage} />

      {selectedImage && (
        <div className='selected-image' style={styles.selectedImageContainer}>
          <h3 style={styles.selectedImageHeader}>Selected Image:</h3>
          <img
            src={buildImgixUrl(selectedImage.url, {
              w: 600,
              h: 400,
              fit: 'max',
              auto: 'format,compress'
            })}
            alt={selectedImage.name}
            style={styles.selectedImage}
          />
          <p style={styles.imageName}>{selectedImage.name}</p>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  subHeader: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
  },
  error: {
      color: 'red',
      textAlign: 'center',
  },
  selectedImageContainer: {
      marginTop: '30px',
      textAlign: 'center',
  },
  selectedImageHeader: {
      color: '#555',
  },
  selectedImage: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
      margin: '0 auto',
  },
  imageName: {
      marginTop: '10px',
      fontSize: '16px',
      color: '#666',
  },
};

export default Page;
