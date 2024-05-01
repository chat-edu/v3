import React from 'react';

import {GraphMedia} from "@/types/graph/GraphMedia";
import {Image} from "@chakra-ui/react";

interface Props {
    graphMedia: GraphMedia,
}

const ImageMediaModalContent: React.FC<Props> = ({ graphMedia }) => {
    return (
        <Image
            src={graphMedia.mediaUrl}
            alt={graphMedia.name}
            width="100%"
        />
    );
};

export default ImageMediaModalContent;
