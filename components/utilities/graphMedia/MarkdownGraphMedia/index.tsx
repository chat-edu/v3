import React from 'react';

import GraphMediaBase from "@/components/utilities/graphMedia/GraphMediaBase";
import AnalyzeButton from "@/components/utilities/graphMedia/AnalyzeButton";
import MarkdownMediaModalContent from "@/components/utilities/graphMedia/MarkdownGraphMedia/MarkdownMediaModalContent";

import {GraphMedia} from "@/types/graph/GraphMedia";

interface Props {
    graphMedia: GraphMedia
}

const ImageGraphMedia: React.FC<Props> = ({ graphMedia }) => {
    return (
        <GraphMediaBase
            graphMedia={graphMedia}
            analyzeButton={
                <AnalyzeButton
                    graphMedia={graphMedia}
                />
            }
            modalContent={
                <MarkdownMediaModalContent
                    mediaUrl={graphMedia.mediaUrl}
                />
            }
        />
    );
};

export default ImageGraphMedia;
