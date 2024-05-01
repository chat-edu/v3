import React from 'react';

import GraphMediaBase from "@/components/utilities/graphMedia/GraphMediaBase";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";
import AnalyzeVideoButton from "@/components/utilities/graphMedia/VideoGraphMedia/AnalyzeVideoButton";
import VideoMediaModalContent from "@/components/utilities/graphMedia/VideoGraphMedia/VideoMediaModalContent";

interface Props {
    graphMedia: GraphMediaType,
}

const VideoGraphMedia: React.FC<Props> = ({ graphMedia }) => {
    return (
        <GraphMediaBase
            graphMedia={graphMedia}
            analyzeButton={
                <AnalyzeVideoButton
                    graphMedia={graphMedia}
                />
            }
            modalContent={
                <VideoMediaModalContent
                    graphMedia={graphMedia}
                />
            }
        />
    );
};

export default VideoGraphMedia;
