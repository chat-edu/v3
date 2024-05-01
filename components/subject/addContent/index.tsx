import React from 'react';

import {
    Container,
    Heading,
    Text,
    VStack
} from "@chakra-ui/react";

import UploadCard from "@/components/subject/addContent/UploadCard";

import {Graph} from "@/types/graph/Graph";
import UnprocessedMedia from "@/components/subject/addContent/UnprocessedMedia";
import ProcessedMedia from "@/components/subject/addContent/ProcessedMedia";

interface Props {
    graphId: Graph['id'];
}

const AddContentModal: React.FC<Props> = ({ graphId }) => {

    return (
        <Container
            py={8}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
        >
            <UploadCard
                graphId={graphId}
            />
            <UnprocessedMedia
                graphId={graphId}
            />
            <ProcessedMedia
                graphId={graphId}
            />
        </Container>
    );
};

export default AddContentModal;
