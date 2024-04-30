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

    const removeMarkdownHashtags = (text: string): string => {
        // Remove hashtags from the text
        return text.replace(/#/g, '');
    };

    const speak = useCallback(() => {
        console.log("Preparing to speak...");
        if (text && synthesizer) {
            const cleanedText = removeMarkdownHashtags(text); // Clean the text
            setIsLoading(true);
            synthesizer.speakTextAsync(
                cleanedText,
                result => {
                    setIsPlaying(true);
                    setIsLoading(false);
                    if (result.reason === ResultReason.SynthesizingAudioCompleted) {
                        console.log("Speech synthesis succeeded.");
                    }
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
            console.log("Speech synthesis stopped.");
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