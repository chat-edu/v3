import React from 'react';

import Link from "next/link";

import {Card, Text} from "@chakra-ui/react";

import UsernameText from "@/components/utilities/UsernameText";

import {Graph} from "@/types/graph/Graph";

interface Props {
    graph: Graph
}

const GraphCard: React.FC<Props> = ({ graph }) => {

    return (
        <Link
            href={`/subject/${graph.id}`}
            passHref
            style={{
                flex: 1
            }}
        >
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
