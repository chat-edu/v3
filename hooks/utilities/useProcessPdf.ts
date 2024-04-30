import {useEffect, useState} from "react";

import {useToast} from "@chakra-ui/react";

import {extractTextFromFile} from "@/services/pdfToText/extractText";


const useProcessPdf = () => {

    const toast = useToast();

    const [file, setFile] = useState<File | null>(null);
    const [isFileExtracting, setIsFileExtracting] = useState(false);

    const [extractedText, setExtractedText] = useState('');

    useEffect(() => {
        if (!file) {
            setExtractedText('');
        }
    }, [file])

    const updateFile = (file: File) => {
        setFile(file);
    }

    const resetFile = () => {
        setFile(null);
    }

    const processFile = async () => {
        if (!file) {
            return;
        }
        setIsFileExtracting(true);
        setExtractedText(await extractTextFromFile(file));
        setIsFileExtracting(false);
        toast({
            title: "File Extracted",
            description: "Your file has been extracted.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    }

    return {
        file,
        isFileExtracting,
        extractedText,
        resetFile,
        updateFile,
        processFile
    }
}

export default useProcessPdf;