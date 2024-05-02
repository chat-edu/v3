import { useState, useRef } from "react";
import {newRecognizer} from "@/services/speech/speechToText/config";
import {CancellationDetails, CancellationReason, ResultReason} from "microsoft-cognitiveservices-speech-sdk";

const useSpeechToText = (setText: (text: string) => void) => {

    // State to track whether recording is currently in progress
    const [isRecording, setIsRecording] = useState(false);

    // Ref to store audio chunks during recording
    const chunks = useRef<Blob[]>([]);

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    // Function to start the recording
    const startRecording = async () => {
        const mediaDevices = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = createRecorder(mediaDevices);
        if(!mediaRecorder) return;
        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
        setIsRecording(true);
    };

    // Function to stop the recording
    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            setMediaRecorder(null);
        }
    };

    const createRecorder = (stream: MediaStream) => {
        let options: MediaRecorderOptions = {};
        if (MediaRecorder.isTypeSupported('audio/wav')) {
            options = { mimeType: 'audio/wav' };
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
            options = { mimeType: 'audio/webm' };
        } else {
            return;
        }

        const mediaRecorder = new MediaRecorder(stream, options);

        // Event handler when recording starts
        mediaRecorder.onstart = () => {
            chunks.current = []; // Resetting chunks array
        };

        // Event handler when data becomes available during recording
        mediaRecorder.ondataavailable = (ev) => {
            chunks.current.push(ev.data); // Storing data chunks
        };

        // Event handler when recording stops
        mediaRecorder.onstop = async () => {
            // Creating a blob from accumulated audio chunks with WAV format
            const audioBlob = new Blob(chunks.current, { type: options.mimeType });
            const speechRecognizer = await newRecognizer(audioBlob);
            speechRecognizer.recognizeOnceAsync(result => {
                switch (result.reason) {
                    case ResultReason.RecognizedSpeech:
                        setText(result.text);
                        break;
                    case ResultReason.NoMatch:
                        break;
                    case ResultReason.Canceled:
                        const cancellation = CancellationDetails.fromResult(result);
                        if (cancellation.reason == CancellationReason.Error) {}
                        break;
                }
                speechRecognizer.close();
            });
        };

        return mediaRecorder;
    };

    return { isRecording, startRecording, stopRecording };
};

export default useSpeechToText;