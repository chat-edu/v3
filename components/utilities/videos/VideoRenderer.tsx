import React from 'react';

// @ts-ignore
import { AzureMP } from '@hartmannindustries/azure-media-player'

interface Props {
    src: string;
}

const VideoRenderer: React.FC<Props> = ({ src }) => {
    return (
        <AzureMP
            skin="amp-flush"
            src={[{
                src,
                type: 'video/mp4'
            }]}
        />
    );
};

export default VideoRenderer;
