import React from 'react';

import {Flex} from "@chakra-ui/react";

import InputBox from "@/components/taskChat/InputBox";
import Messages from "@/components/taskChat/Messages";

import useTaskChat from "@/hooks/task/useTaskChat";
import {Task} from "@/types/Task";
import {Topic} from "@/types/graph/Topic";

interface Props {
    task: Task,
    topics: Topic[]
}

const TaskChat: React.FC<Props> = ({ task, topics }) => {

    const {
        input,
        messages,
        promptType,
        answerMapping,
        isLoading,
        handleInputChange,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop
    } = useTaskChat(task, topics);

    return (
        <Flex
            flexDirection={'column'}
            position={'relative'}
            overflow={'auto'}
            ref={setMessageBottomRef}
            flex={1}
            h={'100%'}
        >
            <Messages
                messages={messages}
                promptWithCommand={promptWithCommand}
                answerMapping={answerMapping}
                isLoading={isLoading}
            />
            <InputBox
                value={input}
                isLoading={isLoading}
                promptType={promptType}
                showMessage={messages.length === 0}
                answerMapping={answerMapping}
                handleChange={handleInputChange}
                handleSubmit={onSubmit}
                promptWithCommand={promptWithCommand}
                stop={stop}
            />
        </Flex>
    );
};

export default TaskChat;
