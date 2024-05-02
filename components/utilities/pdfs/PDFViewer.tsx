import React from 'react';

import {Box} from "@chakra-ui/react";

import {Viewer, Worker} from "@react-pdf-viewer/core";

import '@react-pdf-viewer/core/lib/styles/index.css';

interface Props {
    fileUrl: string,
    height?: string
}

const PDFViewer: React.FC<Props> = ({ fileUrl, height = "400px" }) => {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Box
                height={height}
            >
                <Viewer
                    fileUrl={fileUrl}
                />
            </Box>
        </Worker>
    );
};

export default PDFViewer;
