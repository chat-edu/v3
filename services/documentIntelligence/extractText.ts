import documentAnalysisClient from "@/services/documentIntelligence/client";

export const extractTextFromFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const poller = await documentAnalysisClient.beginClassifyDocument('prebuilt-read', file)

    const { pages } = await poller.pollUntilDone();

    return (pages || []).reduce((acc, page) => {
        const pageText = (page.words || []).reduce((pageAcc, word) => pageAcc + word.content + ' ', '');
        return acc + pageText;
    }, '');
}