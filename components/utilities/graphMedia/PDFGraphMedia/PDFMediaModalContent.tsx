import React from 'react';

import {Viewer, Worker} from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';

import {GraphMedia} from "@/types/graph/GraphMedia";
import {Box} from "@chakra-ui/react";

interface Props {
    graphMedia: GraphMedia
}

const PDFMediaModalContent: React.FC<Props> = ({ graphMedia }) => {

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Box
                height='400px'
            >
                <Viewer
                    fileUrl={graphMedia.mediaUrl}
                />
            </Box>
        </Worker>
    );
};

export default PDFMediaModalContent;
