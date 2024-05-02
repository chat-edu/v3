import React from 'react';

import VideoRenderer from "@/components/utilities/videos/VideoRenderer";

import {GraphMedia} from "@/types/graph/GraphMedia";

interface Props {
    graphMedia: GraphMedia,
}

const VideoMediaModalContent: React.FC<Props> = ({ graphMedia }) => {
    return (
        <VideoRenderer
            src={graphMedia.mediaUrl}
        />
    );
};

export default VideoMediaModalContent;
