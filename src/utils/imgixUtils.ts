import { ImageParams, Image } from "../types/types";

export const buildImgixUrl = (
    image: Image,
    params: ImageParams
): string => {
    if (!image.params && !params) {
        return image.url;
    } else {
        image.params = params
    }

    const url = new URL(image.url);
    Object.entries(image.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });

    image.paramUrl = url.toString();

    return image.paramUrl;
}