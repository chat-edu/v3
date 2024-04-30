import {SpeechConfig} from "microsoft-cognitiveservices-speech-sdk";

export const speechConfig = () => {
    const speechConfig = SpeechConfig.fromSubscription(
        process.env.NEXT_PUBLIC_SPEECH_KEY as string,
        process.env.NEXT_PUBLIC_SPEECH_REGION as string
    );
    speechConfig.speechSynthesisVoiceName = "en-US-AvaNeural";
    return speechConfig;
}