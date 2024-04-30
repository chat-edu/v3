import React, { useState } from 'react';
import { FaMicrophone, FaCircleStop } from "react-icons/fa6"; // Added FaStopCircle for stop icon
import { IconButton } from "@chakra-ui/react";
import useRecordVoice from "@/hooks/utilities/useRecordVoice";

interface Props {
    setText: (text: string) => void
}

const SpeechToText: React.FC<Props> = ({ setText }) => {
    const { startRecording, stopRecording, isRecording } = useRecordVoice(setText);
    const [recording, setRecording] = useState(false);

    const toggleRecording = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
        setRecording(!recording);
    };

    return (
        <IconButton
            onClick={toggleRecording}
            icon={recording ? <FaCircleStop /> : <FaMicrophone />}
            colorScheme={'brand'}
            variant={'outline'}
            aria-label={recording ? 'Stop Recording' : 'Start Recording'}
        />
    );
};

export default SpeechToText;
