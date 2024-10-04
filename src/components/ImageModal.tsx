import React, { useState, useEffect, useContext } from 'react';
import { ImageParameters, Image, AllowedValues, AllowedFlip } from '../types/types';
import { ImageContext } from '../contexts/ImageContext';
import { FlipOptions } from '../constants/flipOptions';

interface ImageModalProps {
  image: Image;
  index: number;
  options: AllowedValues[];
}

const ImageModal: React.FC<ImageModalProps> = ({ image, index, options }) => {
  const imageContext = useContext(ImageContext);

  if (!imageContext) {
    throw new Error('ImageModal must be used within an ImageProvider');
  }

  const { updateImageParameters } = imageContext;

  const [loading, setLoading] = useState<boolean>(true);
  const [rotValue, setRotValue] = useState<number>(image.parameters.rot || 0);
  const [orientValue, setOrientValue] = useState<number>(image.parameters.orient || 0);

  useEffect(() => {
    setRotValue(image.parameters.rot || 0);
    setOrientValue(image.parameters.orient || 0);
  }, [image.parameters.rot, image.parameters.orient]);

  const handleRotationChange = (value: number) => {
    setRotValue(value);
  };

  const handleRotationCommit = () => {
    const updatedParams: ImageParameters = { ...image.parameters, rot: rotValue };
    updateImageParameters(index, updatedParams);
    setLoading(true);
  };

  const toggleFlip = () => {
    let newFlip: AllowedFlip | undefined;
    if (image.parameters.flip === FlipOptions.Vertical) {
      newFlip = undefined;
    } else if (image.parameters.flip === FlipOptions.Horizontal) {
      newFlip = FlipOptions.Both;
    } else {
      newFlip = FlipOptions.Vertical;
    }
    const updatedParams: ImageParameters = { ...image.parameters, flip: newFlip };
    updateImageParameters(index, updatedParams);
    setLoading(true);
  };

  const toggleFlipHorizontal = () => {
    let newFlip: AllowedFlip | undefined;
    if (image.parameters.flip === FlipOptions.Horizontal) {
      newFlip = undefined;
    } else if (image.parameters.flip === FlipOptions.Vertical) {
      newFlip = FlipOptions.Both;
    } else {
      newFlip = FlipOptions.Horizontal;
    }
    const updatedParams: ImageParameters = { ...image.parameters, flip: newFlip };
    updateImageParameters(index, updatedParams);
    setLoading(true);
  };

  const handleOrientChange = (value: number) => {
    const updatedParams: ImageParameters = { ...image.parameters, orient: value };
    updateImageParameters(index, updatedParams);
    setOrientValue(value);
    setLoading(true);
  };

  return (
    <>
      <div style={{ display: loading ? "none" : "block" }}>
        <img
          className={`max-w-[${image.parameters.w}px] max-h-[${image.parameters.h}px] object-cover`}
          src={image.parameterUrl || image.url}
          alt={image.name}
          onLoad={() => setLoading(false)}
        />

        <div className='bg-white p-4 rounded-lg shadow-md mt-4'>
          <label htmlFor="rotation-range" className="block mb-2 text-sm font-medium text-gray-900">
            Rotation: {rotValue}°
          </label>
          <input
            id="rotation-range"
            type="range"
            min={0}
            max={359}
            step={1}
            value={rotValue}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => handleRotationChange(parseInt(e.target.value))}
            onMouseUp={handleRotationCommit}
          />
        </div>

        <div className="flex mt-4 justify-left items-center space-x-4">
          <button
            className="text-3xl hover:cursor-pointer text-blue-500"
            onClick={toggleFlip}
            title="Flip Vertically"
          >
            &#8693;
          </button>

          <button
            className="text-3xl hover:cursor-pointer text-blue-500 transform rotate-90"
            onClick={toggleFlipHorizontal}
            title="Flip Horizontally"
          >
            &#8693;
          </button>

          <div>
            <label htmlFor="orient-select" className="block mb-2 text-sm font-medium text-gray-900">
              Orientation:
            </label>
            <select
              id="orient-select"
              value={orientValue}
              onChange={(e) => handleOrientChange(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded-md"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}°
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {loading && (
        <div className='w-8 h-8 text-white flex justify-center items-center'>
          Loading...
        </div>
      )}
    </>
  );
};

export default ImageModal;
