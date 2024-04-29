import React from 'react';

import {HStack, Icon} from "@chakra-ui/react";

import {FaInfo} from "react-icons/fa";

import Markdown from "@/components/utilities/markdown"

import {DontKnow as DontKnowType} from "@/types/commands/DontKnow";

interface Props {
    dontKnow: DontKnowType
}

const DontKnow: React.FC<Props> = ({ dontKnow }) => {
    return (
        <HStack
            spacing={4}
        >
            <Icon
                as={FaInfo}
            />
            <Markdown>
                {dontKnow.explanation}
            </Markdown>
        </HStack>
    );
};

export default DontKnow;
