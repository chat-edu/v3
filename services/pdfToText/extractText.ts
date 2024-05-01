import documentAnalysisClient from "@/services/pdfToText/client";

export const extractTextFromFile = async (file: Buffer) => {
    const poller = await documentAnalysisClient.beginClassifyDocument('prebuilt-read', file);

    const { pages } = await poller.pollUntilDone();

    return (pages || []).reduce((acc, page) => {
        const pageText = (page.words || []).reduce((pageAcc, word) => pageAcc + word.content + ' ', '');
        return acc + pageText;
    }, '');
}