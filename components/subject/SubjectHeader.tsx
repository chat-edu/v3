import React from 'react';

import Link from "next/link";

import {Button, Heading, HStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import {Graph} from "@/types/graph/Graph";
import {PiGraph} from "react-icons/pi";

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
                <Link
                    href={`/subject/${graph.id}/addContent`}
                >
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme={'brand'}
                        variant={'outline'}
                    >
                        Add Knowledge
                    </Button>
                </Link>
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
