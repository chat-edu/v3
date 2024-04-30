import {useState} from "react";

const useImageInput = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const files = Array.from(e.target.files).filter(file => file.type.includes("image"));
        const imageUrls = files.map(file => URL.createObjectURL(file));
        console.log(imageUrls)
        setImages([...images, ...imageUrls]);
    };

    const resetImages = () => {
        setImages([]);
    }

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return { images, handleImagesChange, resetImages, removeImage };
}

export default useImageInput;