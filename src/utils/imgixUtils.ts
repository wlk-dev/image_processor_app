export const buildImgixUrl = (
    baseUrl: string,
    params?: Record<string, string | number | boolean>
): string => {
    if (!params) {
        return baseUrl;
    }

    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });

    return url.toString();
}