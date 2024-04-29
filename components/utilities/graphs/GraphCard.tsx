import React from 'react';

import {Card, Text, useDisclosure} from "@chakra-ui/react";

import UsernameText from "@/components/utilities/UsernameText";
import GraphPreviewModal from "@/components/utilities/graphs/GraphPreviewModal";

import {Graph} from "@/types/graph/Graph";

interface Props {
    graph: Graph
}

const GraphCard: React.FC<Props> = ({ graph }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <GraphPreviewModal
                isOpen={isOpen}
                onClose={onClose}
                graphId={graph.id}
            />
            <Card
                gap={2}
                w={'100%'}
                transition={'all 0.2s'}
                _hover={{
                    cursor: 'pointer',
                    shadow: 'md',
                    borderColor: 'brand.500'
                }}
                borderWidth={2}
                onClick={onOpen}
            >
                <Text
                    fontSize={{
                        base: 'lg',
                        md: 'xl'
                    }}
                    fontWeight={'bold'}
                >
                    {graph.name}
                </Text>
                <UsernameText
                    id={graph.creatorId}
                />
            </Card>
        </>
    );
};

export default GraphCard;
