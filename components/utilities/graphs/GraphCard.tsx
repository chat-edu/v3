import React from 'react';

import {Card, Text} from "@chakra-ui/react";

import UsernameText from "@/components/utilities/UsernameText";

import {Graph} from "@/types/graph/Graph";
import Link from "next/link";

interface Props {
    graph: Graph
}

const GraphCard: React.FC<Props> = ({ graph }) => {
    return (
        <Link
            href={`/graph/${graph.id}`}
        >
            <Card
                gap={2}
                w={'100%'}
                transition={'all 0.2s'}
                _hover={{
                    cursor: 'pointer',
                    shadow: 'md'
                }}
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
        </Link>
    );
};

export default GraphCard;
