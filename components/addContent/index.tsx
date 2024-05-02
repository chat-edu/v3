import React from 'react';

import { Container } from "@chakra-ui/react";

import UploadCard from "@/components/addContent/UploadCard";

import {Graph} from "@/types/graph/Graph";
import UnprocessedMedia from "@/components/addContent/UnprocessedMedia";
import ProcessedMedia from "@/components/addContent/ProcessedMedia";
import AddContentHeader from "@/components/addContent/AddContentHeader";

interface Props {
    graphId: Graph['id'];
}

const AddContentModal: React.FC<Props> = ({ graphId }) => {

    return (
        <Container
            py={8}
            display={'flex'}
            flexDirection={'column'}
            gap={8}
            maxW={'4xl'}
        >
            <AddContentHeader
                graphId={graphId}
            />
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
