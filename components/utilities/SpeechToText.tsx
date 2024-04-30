import React from 'react';

import {FaMicrophone} from "react-icons/fa6";

import {IconButton} from "@chakra-ui/react";

import useRecordVoice from "@/hooks/utilities/useRecordVoice";

interface Props {
    setText: (text: string) => void
}

const SpeechToText: React.FC<Props> = ({ setText }) => {

    const { startRecording, stopRecording } = useRecordVoice(setText);

    return (
        <IconButton
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            colorScheme={'brand'}
            variant={'outline'}
            icon={<FaMicrophone />}
            aria-label={'Speech to Text'}
        />
    );
};

export default SpeechToText;
