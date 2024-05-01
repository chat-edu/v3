import React from 'react';

import VideoGraphMedia from "@/components/utilities/graphMedia/VideoGraphMedia";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import ImageGraphMedia from "@/components/utilities/graphMedia/ImageGraphMedia";

interface Props {
    graphMedia: GraphMediaType
}

const GraphMedia: React.FC<Props> = ({ graphMedia }) => {
    switch (graphMedia.mediaType) {
        case GraphMediaTypes.Image:
            return (
                <ImageGraphMedia
                    graphMedia={graphMedia}
                />
            );
        case GraphMediaTypes.Video:
            return (
                <VideoGraphMedia
                    graphMedia={graphMedia}
                />
            );
        default:
            return null;
    }
};

export default GraphMedia;
