import React from 'react';

import {Task} from "@/types/Task";
import {Card, HStack, Text} from "@chakra-ui/react";
import Link from "next/link";

interface Props {
    task: Task
}

const TaskCard: React.FC<Props> = ({ task }) => {
    return (
        <Link
            href={`/task/${task.id}`}
            passHref
            style={{
                width: '100%'
            }}
        >
            <Card
                p={4}
                w={'full'}
                borderWidth={2}
                transition={'all 0.2s ease-in-out'}
                _hover={{
                    borderColor: 'brand.500'
                }}
            >
                <HStack>
                    <Text
                        fontWeight={'semibold'}
                    >
                        {task.text}
                    </Text>
                </HStack>
            </Card>
        </Link>
    );
};

export default TaskCard;
