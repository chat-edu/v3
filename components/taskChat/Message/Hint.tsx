import React from 'react';

import {HStack, Icon, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {AiOutlineInfoCircle} from "react-icons/ai";

import {Hint as HintType} from "@/types/commands/Hint";
import Markdown from "@/components/utilities/markdown";
interface Props {
    hint: HintType
}

const Hint: React.FC<Props> = ({ hint }) => {

    const iconColor = useColorModeValue("black", "white");

    return (
        <HStack
            spacing={4}
        >
            <Icon
                as={AiOutlineInfoCircle}
                color={iconColor}
                boxSize={6}
            />
            <VStack
                align={'start'}
                spacing={0}
            >
                <Text
                    fontSize={{
                        base: 'xs',
                        md: 'md'
                    }}
                    fontWeight={'semibold'}
                    opacity={0.7}
                >
                    Hint
                </Text>
                <Markdown>
                    {hint.hint}
                </Markdown>
            </VStack>
        </HStack>
    );
};

export default Hint;
