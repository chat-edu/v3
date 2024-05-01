import React from 'react';
import {GraphMedia} from "@/types/graph/GraphMedia";
import GraphMediaBase from "@/components/utilities/graphMedia/GraphMediaBase";
import AnalyzeButton from "@/components/utilities/graphMedia/AnalyzeButton";
import ImageMediaModalContent from "@/components/utilities/graphMedia/ImageGraphMedia/ImageMediaModalContent";

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
                <ImageMediaModalContent
                    graphMedia={graphMedia}
                />
            }
        />
    );
};

export default ImageGraphMedia;
