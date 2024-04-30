import { useEffect, useState, useRef } from "react";
import {newRecognizer} from "@/services/speech/speechToText/config";
import {CancellationDetails, CancellationReason, ResultReason} from "microsoft-cognitiveservices-speech-sdk";

const useRecordVoice = (setText: (text: string) => void) => {
    // State to hold the media recorder instance
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    // State to track whether recording is currently in progress
    const [isRecording, setIsRecording] = useState(false);

    // Ref to store audio chunks during recording
    const chunks = useRef<Blob[]>([]);

    // Function to start the recording
    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setIsRecording(true);
        }
    };

    // Function to stop the recording
    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    // Function to initialize the media recorder with the provided stream
    const initialMediaRecorder = (stream: MediaStream) => {
        let options: MediaRecorderOptions = {};
        if (MediaRecorder.isTypeSupported('audio/wav')) {
            options = { mimeType: 'audio/wav' };
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
            options = { mimeType: 'audio/webm' };
        } else {
            console.error('No supported audio type found.');
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
                        console.log(`RECOGNIZED: Text=${result.text}`);
                        setText(result.text);
                        break;
                    case ResultReason.NoMatch:
                        console.log("NOMATCH: Speech could not be recognized.");
                        break;
                    case ResultReason.Canceled:
                        const cancellation = CancellationDetails.fromResult(result);
                        console.log(`CANCELED: Reason=${cancellation.reason}`);

                        if (cancellation.reason == CancellationReason.Error) {
                            console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                            console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                            console.log("CANCELED: Did you set the speech resource key and region values?");
                        }
                        break;
                }
                speechRecognizer.close();
            });
        };

        setMediaRecorder(mediaRecorder);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(initialMediaRecorder);
        }
    }, []);

    return { isRecording, startRecording, stopRecording };
};

export default useRecordVoice;