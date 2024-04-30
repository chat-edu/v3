import { useEffect, useState, useRef } from "react";
import { newRecognizer } from "@/services/speech/speechToText/config";
import { CancellationDetails, CancellationReason, ResultReason } from "microsoft-cognitiveservices-speech-sdk";

const useRecordVoice = (setText: (text: string) => void) => {
    // Ref to store audio chunks during recording
    const chunks = useRef<Blob[]>([]);

    // Ref to store the media recorder to avoid reinitializations
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    // State to track whether recording is currently in progress
    const [isRecording, setIsRecording] = useState(false);

    // Function to start the recording
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            if (MediaRecorder.isTypeSupported('audio/wav')) {
                mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/wav' });
            } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            } else {
                console.error('No supported audio type found.');
                return;
            }

            mediaRecorderRef.current.ondataavailable = (ev) => {
                chunks.current.push(ev.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(chunks.current, { type: mediaRecorderRef.current?.mimeType });
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
                chunks.current = []; // Clear chunks after processing
                stream.getTracks().forEach(track => track.stop()); // Stop the stream
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        }).catch(console.error);
    };

    // Function to stop the recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return { isRecording, startRecording, stopRecording };
};

export default useRecordVoice;
