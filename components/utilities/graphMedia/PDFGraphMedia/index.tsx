import React from 'react';

import GraphMediaBase from "@/components/utilities/graphMedia/GraphMediaBase";
import AnalyzeButton from "@/components/utilities/graphMedia/AnalyzeButton";

import {GraphMedia} from "@/types/graph/GraphMedia";
import PDFMediaModalContent from "@/components/utilities/graphMedia/PDFGraphMedia/PDFMediaModalContent";

interface Props {
    graphMedia: GraphMedia
}

const PDFGraphMedia: React.FC<Props> = ({ graphMedia }) => {
    return (
        <GraphMediaBase
            graphMedia={graphMedia}
            analyzeButton={
                <AnalyzeButton
                    graphMedia={graphMedia}
                />
            }
            modalContent={
                <PDFMediaModalContent
                    graphMedia={graphMedia}
                />
            }
        />
    );
};

export default PDFGraphMedia;
