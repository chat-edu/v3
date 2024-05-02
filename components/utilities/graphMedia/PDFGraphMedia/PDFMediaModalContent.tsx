import React from 'react';


import {GraphMedia} from "@/types/graph/GraphMedia";
import PDFViewer from "@/components/utilities/pdfs/PDFViewer";

interface Props {
    graphMedia: GraphMedia
}

const PDFMediaModalContent: React.FC<Props> = ({ graphMedia }) => {
    return (
        <PDFViewer fileUrl={graphMedia.mediaUrl} />
    );
};

export default PDFMediaModalContent;
