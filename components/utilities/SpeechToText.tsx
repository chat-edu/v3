import React from 'react';

import {FaMicrophone} from "react-icons/fa6";

import { css, keyframes } from '@emotion/react';

import {Icon, IconButton, Tooltip} from "@chakra-ui/react";

import useSpeechToText from "@/hooks/utilities/useSpeechToText";

interface Props {
    setText: (text: string) => void
}

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const SpeechToText: React.FC<Props> = ({ setText }) => {

    const { startRecording, stopRecording, isRecording } = useSpeechToText(setText);

    return (
        <Tooltip
            label={isRecording ? 'Stop Recording' : 'Start Recording'}
            aria-label={'Speech to Text'}
        >
            <IconButton
                onClick={isRecording ? stopRecording : startRecording}
                colorScheme={'brand'}
                variant={isRecording ? 'solid' : 'outline'}
                icon={
                    <Icon
                        as={FaMicrophone}
                        css={isRecording
                            ? css`animation: ${pulse} 1s infinite;`
                            : undefined}
                    />
                }
                aria-label={'Speech to Text'}
            />
        </Tooltip>
    );
};

export default SpeechToText;
