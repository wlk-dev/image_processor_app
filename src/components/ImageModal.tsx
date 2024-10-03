import React from 'react';
import { ImageParams, Image, Index } from '../types/types';
import { buildImgixUrl } from '../utils/imgixUtils';

const {useState} = React;

// TODO: Implement transformation history.
export const ImageModal: React.FC<{images: Image[], params: ImageParams, index: Index}> = ({images, params, index}) => {
    const [loading, setLoading] = useState(true);
    // TODO: Implement orient and rot.
    const {flip} = images[index].params

    return (
        <>
            <div style={{display: loading ? "none": "block"}}>
                <img className={`max-w-[${params.w}px] max-h-[${params.h}px] object-cover alt=${images[index].name}`}
                    src={buildImgixUrl(images[index], images[index].params || params)}
                    onLoad={() => setLoading(false)}
                />
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
                </div>
            </div>
            <div className='w-8 h-8 text-white' style={{display: loading ? "block" : "none"}}>
                    Loading...
            </div>
        </>
    )
}