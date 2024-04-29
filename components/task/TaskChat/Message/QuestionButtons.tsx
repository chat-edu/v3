import React from 'react';

import {Button, Stack} from "@chakra-ui/react";

import {hintCommand} from "@/llm/prompts/commands";
import {dontKnowCommand} from "@/llm/prompts/commands";

import {Command} from "@/types/commands/Command";

interface Props {
    promptWithCommand: (command: Command<any>) => void,
    answered: boolean
}

const QuestionButtons: React.FC<Props> = ({ promptWithCommand, answered }) => {
    return (
        <Stack
            flexDir={{
                base: 'column',
                md: 'row'
            }}
            alignItems={{
                base: 'flex-end',
                md: 'center'
            }}
        >
            <Button
                variant={'outline'}
                colorScheme={'brand'}
                onClick={() => promptWithCommand(hintCommand)}
                isDisabled={answered}
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Hint
            </Button>
            <Button
                variant={'outline'}
                onClick={() => {
                    promptWithCommand(dontKnowCommand)
                }}
                isDisabled={answered}
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                {"Don't Know"}
            </Button>
        </Stack>
    );
};

export default QuestionButtons;
