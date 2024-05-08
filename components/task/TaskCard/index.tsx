import React from 'react';

import {Task} from "@/types/task/Task";
import {Card, HStack, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";
import TaskSubject from "@/components/task/TaskCard/TaskSubject";
import {CheckIcon} from "@chakra-ui/icons";
import TaskProgress from "@/components/task/TaskCard/TaskProgress";

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
                <HStack
                    spacing={4}
                    w={'100%'}
                >
                    {
                        task.completed && (
                            <CheckIcon
                                color={'brand.500'}
                            />
                        )
                    }
                    <VStack
                        alignItems={'flex-start'}
                        spacing={1}
                        w={'100%'}
                    >
                        {
                            showSubject && (
                                <TaskSubject task={task} />
                            )
                        }
                        <Text
                            fontWeight={'semibold'}
                        >
                            {task.text}
                        </Text>
                        {
                            !task.completed && (
                                <TaskProgress taskId={task.id} />
                            )
                        }
                    </VStack>
                </HStack>
            </Card>
        </Link>
    );
};

export default TaskCard;
