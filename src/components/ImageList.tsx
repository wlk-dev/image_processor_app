import React from 'react';
import {ImageListProps} from '@/types/types'
import { buildImgixUrl } from '@/utils/imgixUtils';

const ImageList: React.FC<ImageListProps> = ({images, onSelectImage}) => {
    return (
        <div className='image-list' style={styles.imageList}>
            {images.map( (image, index) => {
                const imgixParams = {
                    w: 300,
                    h: 300,
                    fit: 'crop',
                    auto: 'format,compress'
                }

                const optimizedUrl = buildImgixUrl(image.url, imgixParams)

                return (
                    <div
                        key={image.id || index}
                        style={styles.imageContainer}
                        onClick={() => onSelectImage(image)}
                    >
                        <img
                            src={optimizedUrl}
                            alt={image.name}
                            style={styles.image}
                        />
                        <p style={styles.imageName}>{image.name}</p>
                    </div>
                )

            } )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    imageList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageContainer: {
        margin: '10px',
        cursor: 'pointer',
        textAlign: 'center',
    },
    image: {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    imageName: {
        marginTop: '8px',
        fontSize: '14px',
        color: '#555'
    }
}

export default ImageList