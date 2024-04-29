import React from 'react';

import {Button, Card, Heading, Text} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import {Graph} from "@/types/graph/Graph";
import TextInput from "@/components/utilities/forms/TextInput";
import useTaskInput from "@/hooks/subject/useTaskInput";

interface Props {
    subjectId: Graph['id']
}

const TaskInput: React.FC<Props> = ({ subjectId }) => {

    const { user } = useAuth();

    const { task, setTask, isLoading, onSubmit } = useTaskInput(subjectId);

    return (
        <Card
            p={4}
            w={'100%'}
            gap={4}
        >
            <Heading
                size={'lg'}
            >
                Welcome{user ? `, ${user.name}` : ''}!
            </Heading>
            <TextInput
                label={"What would you like to learn today?"}
                placeholder={"Enter a learning objective..."}
                value={task}
                onChange={setTask}
            />
            <Button
                isLoading={isLoading}
                onClick={onSubmit}
                colorScheme={"brand"}
                w={'100%'}
            >
                Start Learning
            </Button>
        </Card>
    );
};

export default TaskInput;
