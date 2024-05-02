import React from 'react';

import Link from "next/link";

import {Button, Heading, HStack} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";

import {PiGraph} from "react-icons/pi";

import Loading from "@/components/utilities/Loading";

import useGraph from "@/hooks/queries/graphs/useGraph";

import {Graph} from "@/types/graph/Graph";

interface Props {
    graphId: Graph['id']
}

const AddContentHeader: React.FC<Props> = ({ graphId }) => {

    const { graph, loading } = useGraph(graphId);

    return (
        <Loading loading={loading || !graph}>
            {
                graph ? (
                    <HStack
                        w={'100%'}
                        justifyContent={'space-between'}
                    >
                        <Heading>
                            {graph.name}
                        </Heading>
                        <HStack>
                            <Link
                                href={`/subject/${graph.id}`}
                            >
                                <Button
                                    colorScheme={'brand'}
                                    variant={'outline'}
                                    leftIcon={<ChevronLeftIcon />}
                                >
                                    Back to Subject
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
                ) : null
            }
        </Loading>
    );
};

export default AddContentHeader;
