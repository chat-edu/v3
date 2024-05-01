import {useCallback, useEffect, useState} from "react";

import {newSynthesizer} from "@/services/speech/textToSpeech/config";
import {ResultReason, SpeechSynthesizer} from "microsoft-cognitiveservices-speech-sdk";

const useTextToSpeech = (text: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [synthesizer, setSynthesizer] = useState<SpeechSynthesizer | null>(null);

    // Initialize the synthesizer
    useEffect(() => {
        setSynthesizer(newSynthesizer());
        return () => {
            synthesizer?.close()
        };
    }, []);

    const speak = useCallback(() => {
        if (text && synthesizer) {
            setIsLoading(true);
            synthesizer.speakTextAsync(
                text,
                result => {
                    setIsPlaying(true);
                    setIsLoading(false);
                    if (result.reason === ResultReason.SynthesizingAudioCompleted) {}
                    setTimeout(() => {
                        setIsPlaying(false);
                    }, result.audioDuration / 10000);
                },
                error => {
                    console.error(error);
                    setIsLoading(false);
                }
            );
        }
    }, [text, synthesizer]);

    const stopSpeaking = useCallback(() => {
        if (isPlaying && synthesizer) {
            synthesizer.close(); // Close the synthesizer to stop speaking
            setIsPlaying(false);
            setSynthesizer(newSynthesizer());
        }
    }, [isPlaying, synthesizer]);

    return {
        isLoading,
        isPlaying,
        speak,
        stopSpeaking
    };
};

export default useTextToSpeech;