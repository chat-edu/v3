import React from 'react';

import {Task} from "@/types/Task";
import {Card, HStack, Text} from "@chakra-ui/react";
import Link from "next/link";
import TaskSubject from "@/components/task/TaskCard/TaskSubject";

interface Props {
    task: Task,
    showSubject?: boolean
}

const TaskCard: React.FC<Props> = ({ task, showSubject }) => {
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
                {
                    showSubject && (
                        <TaskSubject task={task} />
                    )
                }
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
