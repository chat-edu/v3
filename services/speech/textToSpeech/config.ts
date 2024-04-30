import {AudioConfig, SpeechSynthesizer} from "microsoft-cognitiveservices-speech-sdk";
import {speechConfig} from "@/services/speech/config";

export const speakerAudioConfig = () => AudioConfig.fromDefaultSpeakerOutput();

export const newSynthesizer = () => new SpeechSynthesizer(speechConfig(), speakerAudioConfig());