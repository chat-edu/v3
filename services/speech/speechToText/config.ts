import {
    AudioConfig,
    AudioInputStream,
    AudioStreamFormat,
    SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk";
import {speechConfig} from "@/services/speech/config";

// Import the FFmpeg library
import { FFmpeg } from '@ffmpeg/ffmpeg';

// Function to check and convert the audio file to WAV if needed
const convertToWavIfNeeded = async (audioBlob: Blob): Promise<Blob> => {
    if (audioBlob.type === 'audio/wav') {
        return audioBlob;
    }

    const ffmpeg = new FFmpeg();

    await ffmpeg.load();

    // Write the original blob data to the FFmpeg file system
    const data = new Uint8Array(await audioBlob.arrayBuffer());
    await ffmpeg.writeFile('input', data);

    // Convert to WAV using FFmpeg
    await ffmpeg.exec(['-i', 'input', '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1', 'output.wav']);

    // Read the resulting WAV file back into a Blob
    const output = await ffmpeg.readFile('output.wav');
    return new Blob([output], { type: 'audio/wav' });
};

// Function to convert a Blob to a Stream
const blobToStream = (blob: Blob): AudioInputStream => {
    const pushStream =
        AudioInputStream.createPushStream(AudioStreamFormat.getWaveFormatPCM(16000, 16, 1));

    blob.arrayBuffer()
        .then(arrayBuffer => {
            pushStream.write(arrayBuffer);
            pushStream.close();
        }).catch(error => console.error('Error converting blob to stream:', error));

    return pushStream;
};

// Updated audioConfig using stream
export const audioConfig = (audioBlob: Blob) => AudioConfig.fromStreamInput(blobToStream(audioBlob));

export const newRecognizer = async (audioBlob: Blob) => new SpeechRecognizer(
    speechConfig(),
    audioConfig(await convertToWavIfNeeded(audioBlob))
);