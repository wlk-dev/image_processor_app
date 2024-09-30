import { Image } from "../types/types";

const API_ENDPOINT = 'https://us-central1-prueba-front-280718.cloudfunctions.net/challenge-fe';

export const imageService = async (): Promise<Image[]> => {
    try {
        const response = await fetch(
            API_ENDPOINT
        );
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = (await response.json()) as Image[];
        return data;
    } catch (error) {
        console.error('Error fetching images: ', error);
        throw error;
    }
}