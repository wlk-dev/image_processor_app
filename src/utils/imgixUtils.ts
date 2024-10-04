import { ImageParameters, Image } from './../types/types';

export const buildImgixUrl = (image: Image, params: ImageParameters): string => {
  const url = new URL(image.url);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url.toString();
};
