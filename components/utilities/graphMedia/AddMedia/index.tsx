import React from 'react';

import {HStack} from "@chakra-ui/react";

import {FaImage, FaMarkdown, FaVideo} from "react-icons/fa6";
import {FiFile} from "react-icons/fi";

import MediaInput from "@/components/utilities/graphMedia/AddMedia/MediaInput";

import {Graph} from "@/types/graph/Graph";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";

interface Props {
    graphId: Graph['id'];
}

const AddMedia: React.FC<Props> = ({ graphId }) => {

    return (
        <HStack
            spacing={4}
            w={'100%'}
            alignItems={'flex-start'}
        >
            <MediaInput
                graphId={graphId}
                accept={'image/*'}
                text={'Upload Image'}
                icon={FaImage}
                mediaType={GraphMediaTypes.Image}
            />
            <MediaInput
                graphId={graphId}
                accept={'application/pdf'}
                text={'Upload PDF'}
                icon={FiFile}
                mediaType={GraphMediaTypes.PDF}
            />
            <MediaInput
                graphId={graphId}
                accept={'text/markdown'}
                text={'Upload Markdown'}
                icon={FaMarkdown}
                mediaType={GraphMediaTypes.Markdown}
            />
            <MediaInput
                graphId={graphId}
                accept={'video/*'}
                text={'Upload Video'}
                icon={FaVideo}
                mediaType={GraphMediaTypes.Video}
            />
        </HStack>
    );
};

export default AddMedia;
