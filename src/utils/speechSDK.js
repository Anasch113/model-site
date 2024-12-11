// src/utils/speechSDK.js



export function initializeRecognizer() {

    const azureKey = import.meta.env.VITE_AZURE_KEY
    const azureRegion = import.meta.env.VITE_AZURE_REGION

    const speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
    const audioConfig = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    return recognizer;
}
