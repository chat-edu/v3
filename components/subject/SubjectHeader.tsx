import React from 'react';

import Link from "next/link";

import {Button, Heading, HStack} from "@chakra-ui/react";

import {PiGraph} from "react-icons/pi";

import AddMediaButton from "@/components/utilities/graphMedia/AddMediaButton";

import {Graph} from "@/types/graph/Graph";

interface Props {
    graph: Graph
}

const SubjectHeader: React.FC<Props> = ({ graph }) => {
    return (
        <HStack
            w={'100%'}
            justifyContent={'space-between'}
        >
            <Heading>
                {graph.name}
            </Heading>
            <HStack>
                <AddMediaButton
                    graphId={graph.id}
                />
                <Link href={`/subject/${graph.id}/graph`}>
                    <Button
                        colorScheme={'brand'}
                        variant={'outline'}
                        leftIcon={<PiGraph />}
                    >
                        View Graph
                    </Button>
                </Link>
            </HStack>
        </HStack>
    );
};

export default SubjectHeader;
