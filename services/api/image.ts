
export const uploadImages = async (images: File[]): Promise<string[]> => {
    const formData = new FormData();
    images.forEach((image) => {
        formData.append('file', image);
    });

    return fetch('/api/images', {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => data.urls)
        .catch(() => []);
}