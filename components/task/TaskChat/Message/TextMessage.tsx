import React from 'react';

import Markdown from "@/components/utilities/markdown";
import {HStack} from "@chakra-ui/react";
import TextToSpeech from "@/components/utilities/TextToSpeech";
interface Props {
    content: string,
    showTextToSpeech?: boolean,
}

const TextMessage: React.FC<Props> = ({ content, showTextToSpeech }) => {
    return (
        <HStack>
            <Markdown>
                {content}
            </Markdown>
            {
                showTextToSpeech ? <TextToSpeech text={content} /> : null
            }
        </HStack>
    );
};

export default TextMessage;
