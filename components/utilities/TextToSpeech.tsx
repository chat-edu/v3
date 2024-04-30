import React from 'react';
import useTextToSpeech from "@/hooks/utilities/useTextToSpeech";
import {Button, IconButton} from "@chakra-ui/react";
import {FaPause, FaPlay, FaStop} from "react-icons/fa6";
import {BsSoundwave} from "react-icons/bs";

interface Props {
    text: string
}

const TextToSpeech: React.FC<Props> = ({ text }) => {

    const {
        isLoading,
        isPlaying,
        speak,
        stopSpeaking
    } = useTextToSpeech(text);

    return (
        <IconButton
            onClick={() => isPlaying ? stopSpeaking() : speak()}
            icon={isPlaying
                ? (
                    isPlaying
                        ? <FaStop />
                        : <FaPlay />
                )
                : <BsSoundwave />
            }
            isLoading={isLoading}
            variant={'outline'}
            colorScheme={'brand'}
            aria-label={'Text to Speech'}
        />
    );
};

export default TextToSpeech;
