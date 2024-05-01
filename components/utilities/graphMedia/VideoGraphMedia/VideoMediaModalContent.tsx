import React from 'react';

import {GraphMedia} from "@/types/graph/GraphMedia";

// @ts-ignore
import { AzureMP } from 'react-azure-mp'

interface Props {
    graphMedia: GraphMedia,
}

const VideoMediaModalContent: React.FC<Props> = ({ graphMedia }) => {
    return (
        <AzureMP
            skin="amp-flush"
            src={[{
                src: graphMedia.mediaUrl,
                type: 'video/mp4'
            }]}
        />
    );
};

export default VideoMediaModalContent;
