import React from 'react';
import { ImageParams, Image, Index } from '../types/types';
import { buildImgixUrl } from '../utils/imgixUtils';

const {useState} = React;

type AllowedValues = 1  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 90 | 180 | 270;

// TODO: Implement transformation history.
export const ImageModal: React.FC<{images: Image[], params: ImageParams, index: Index}> = ({images, params, index}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rotValue, setRotValue] = useState<string>('0');
    const [orientValue, setOrientValue] = useState<number>(0);
    const {flip, rot, orient} = images[index].params

    const options: AllowedValues[] = [1,2,3,4,5,6,7,8,90,180,270];

    return (
        <>
            <div style={{display: loading ? "none": "block"}}>
                <img className={`max-w-[${params.w}px] max-h-[${params.h}px] object-cover alt=${images[index].name}`}
                    src={buildImgixUrl(images[index], images[index].params || params)}
                    onLoad={() => {
                        setLoading(false)
                        if (rot) {
                            setRotValue(rot.toString());
                        }
                        if (orient) {
                            setOrientValue(orient)
                        }
                    }}
                />
                
                <div className='bg-white'>
                    <label id="dr-label"  htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Rotation: {rotValue}</label>
                    <input id="default-range" type="range" min={0} max={359} step={1} defaultValue={rot} className="w-full h-2 rounded-lg appearance-nonecursor-pointer"
                    onChange={(e) => {
                        setRotValue(e.target.value)
                    }} onMouseUp={() => {
                        setLoading(true);
                        images[index].params.rot = parseInt(rotValue);
                    }}/>
                </div>

                <div className="flex mt-1 justify-left">
                  <button className="mr-2 text-5xl hover:cursor-pointer text-white" onClick={() => {
                    setLoading(true)
                    {/* Can probably modularize this behavior somehow. And implement logic for continuity of operations. */}
                    if (flip === 'v') {
                        images[index].params.flip = undefined;
                    } else if (flip === 'h') {
                        images[index].params.flip = 'hv'
                    } else {
                        images[index].params.flip = 'v'
                    };
                  }}>&#8693;</button>

                  <button className="mt-2 text-5xl hover:cursor-pointer text-white transform rotate-90 " onClick={ () => {
                      setLoading(true);
                      if (flip === 'h') {
                        images[index].params.flip = undefined;
                      } else if (flip === 'v') {
                        images[index].params.flip = 'hv';
                      } else {
                        images[index].params.flip = 'h'
                      }
                  }}>
                    &#8693;
                  </button>
                  <select value={orient || orientValue} onChange={(e) => {
                    setLoading(true);
                    setOrientValue(parseInt(e.target.value))
                    images[index].params.orient = orientValue;
                  }}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                  </select>
                </div>
            </div>
            <div className='w-8 h-8 text-white' style={{display: loading ? "block" : "none"}}>
                    Loading...
            </div>
        </>
    )
}