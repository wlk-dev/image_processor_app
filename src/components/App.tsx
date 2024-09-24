import React, { useEffect, useState } from 'react';
import ImageList from '@/components/ImageList';
import { Image } from '@/types/types';
import { apiService } from '@/services/apiService';
import { buildImgixUrl } from '@/utils/imgixUtils';

const App: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch on comp mount
        const fetchImages = async () => {
            try {
                const data = await apiService();
                setImages(data);
            } catch (err) {
                setError('Failed to fetch images. Please try again later.')
            }
        };

        fetchImages();
    }, []);

    const handleSelectImage = (image: Image) => {
        setSelectedImage(image);
        console.log("Selected Image:", image);
        // TODO: open modal for image operations
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Image Gallery</h1>
            
            {error && <p style={styles.error}>{error}</p>}

            <ImageList images={images} onSelectImage={handleSelectImage} />

            {selectedImage && (
                <div className='selected-image' style={styles.selectedImageContainer}>
                    <h2 style={styles.subHeader}>Selected Image:</h2>
                    <img
                        src={buildImgixUrl(selectedImage.url, {
                            w: 600,
                            h: 400,
                            fit: 'max',
                            auto: 'format,compress',
                        })}
                        alt={selectedImage.name}
                        style={styles.selectedImage}
                    />
                    <p style={styles.imageName}>{selectedImage.name}</p>
                </div>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    subHeader: {
        textAlign: 'center',
        color: '#555',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    selectedImageContainer: {
        marginTop: '30px',
        textAlign: 'center',
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

export default App;