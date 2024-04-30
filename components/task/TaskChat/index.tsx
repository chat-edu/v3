import React from 'react';

import {Flex} from "@chakra-ui/react";

import InputBox from "@/components/task/TaskChat/InputBox";
import Messages from "@/components/task/TaskChat/Messages";

import useTaskChat from "@/hooks/task/useTaskChat";

const TaskChat: React.FC = () => {

    const {
        input,
        messages,
        promptType,
        answerMapping,
        isLoading,
        handleInputChange,
        setInput,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop,
        nextQuestion,
        skipTopic,
        images,
        handleImagesChange,
        removeImage,
        messageImages
    } = useTaskChat();

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
                skipTopic={skipTopic}
                nextQuestion={nextQuestion}
                messageImages={messageImages}
            />
            <InputBox
                value={input}
                isLoading={isLoading}
                promptType={promptType}
                showMessage={messages.length === 0}
                answerMapping={answerMapping}
                handleChange={handleInputChange}
                setInput={setInput}
                handleSubmit={onSubmit}
                promptWithCommand={promptWithCommand}
                stop={stop}
                nextQuestion={nextQuestion}
                skipTopic={skipTopic}
                handleImagesChange={handleImagesChange}
                images={images}
                removeImage={removeImage}
            />
        </Flex>
    );
};

export default TaskChat;
