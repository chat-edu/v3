import React from 'react';

import {Button, Card, Heading, Text, useDisclosure, VStack} from "@chakra-ui/react";

import UploadModal from "@/components/addContent/UploadModal";

import {Graph} from "@/types/graph/Graph";

interface Props {
    graphId: Graph['id'];
}

const UploadCard: React.FC<Props> = ({ graphId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <UploadModal
                isOpen={isOpen}
                onClose={onClose}
                graphId={graphId}
            />
            <Card
                p={4}
                w={'100%'}
                gap={2}
            >
                <VStack
                    spacing={4}
                    w={'100%'}
                    alignItems={'flex-start'}
                >
                    <Heading
                        size={'lg'}
                    >
                        Add Knowledge Files
                    </Heading>
                    <Text
                        fontWeight={'semibold'}
                    >
                        Add PDFs, images, videos, or text to your knowledge graph.
                    </Text>
                    <Button
                        colorScheme={'brand'}
                        w={'100%'}
                        onClick={onOpen}
                    >
                        Upload
                    </Button>
                </VStack>
            </Card>
        </>
    );
};

export default UploadCard;
