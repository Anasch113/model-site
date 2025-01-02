import React, { useState } from 'react'
import { useEffect } from 'react'
import { Client } from "@gradio/client";
import { LuSend } from "react-icons/lu";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import { FaCloudUploadAlt } from "react-icons/fa";
import FileUploading from '../../components/FileUploading';
import axios from "axios"
import UploadModel from '../../components/UploadModel';
import ChatUI from '../../components/ChatUI';
import { initializeRecognizer } from '../../utils/speechSDK'
import { translateToEnglish, translateToLanguage } from "../../utils/deepLFunctions"
const Home = () => {



    const [modelResponse, setModelResponse] = useState([])
    const [userResponse, setUserResponse] = useState("");
    const [userResponse2, setUserResponse2] = useState("");
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [userMessageSent, setUserMessageSent] = useState(false)
    const [isUploading, setIsUploading] = useState(false); // Uploading state
    const [uploadColor, setUploadColor] = useState('red'); // Button color
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [formDataInfo, setFormDataInfo] = useState({
        name: "",
        email: ""
    })
    const [showModel, setShowModel] = useState(false)
    const [messages, setMessages] = useState([]);



    const azureKey = import.meta.env.VITE_AZURE_KEY
    const azureRegion = import.meta.env.VITE_AZURE_REGION


    const navigate = useNavigate()


    // onChange function

    const handleModelInputChange = (e) => {
        setUserResponse(e.target.value)
        // setUserResponse2(e.target.value)
    }
    const giveUserResponse = () => {
        const response = userResponse
        return response
    }
    const openai = new OpenAI({
        "baseURL": import.meta.env.VITE_MODEL_INFERENCE_ENDPOINT_URL,
        "apiKey": import.meta.env.VITE_HUGGING_FACE_TOKEN,
        dangerouslyAllowBrowser: true
    });


    const hfInference = async (e, transcript) => {
        if (e.type === 'click') {
            e.preventDefault();
        }
        stopSTT();

        try {
            const currentUserResponse = giveUserResponse();
            const userInput = transcript || currentUserResponse;
            console.log("Current user response:", userInput);

            setIsProcessing(true);

            // Step 1: Detect input language and translate if needed
            let translatedInput = userInput; // Default to original input
            let detectedLanguage = "EN"; // Assume English by default

            const { translatedText, detectedLanguage: detectedLang } = await translateToEnglish(userInput);
            if (detectedLang !== "EN") {
                translatedInput = translatedText; // Use translated text if not English
                detectedLanguage = detectedLang;
            }
            console.log("Translated input to English:", translatedInput);
            console.log("Detected Language:", detectedLanguage);

            // Step 2: Add user message (original input) to the state
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: userInput }, // Original user message
            ]);

            // Clear input (if needed)
            setUserResponse("");

            // Step 3: Get model response
            const stream = await openai.chat.completions.create({
                model: "tgi",
                messages: [{ role: "user", content: translatedInput }],
                max_tokens: 150,
                stream: false,
            });

            const modelResponse = stream.choices[0]?.message?.content || "No response";
            console.log("Model response (English):", modelResponse);

            // Step 4: Translate model response back to the original language (if needed)
            let finalResponse = modelResponse;

            if (detectedLanguage !== "EN") {
                finalResponse = await translateToLanguage(modelResponse);
                console.log("Translated response to original language:", finalResponse);
                speakText(finalResponse, 'de-DE');
            }
            else {
                speakText(finalResponse, 'en-US');
            }

            // Step 5: Add model response to the state
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: finalResponse },
            ]);

            // Step 6: Use TTS (if required) to speak the response


            setIsProcessing(false);
        } catch (error) {
            console.error("Error:", error);
            setIsProcessing(false);
        }
    };


    console.log("model response", modelResponse)


    const handleFormClick = () => {
        document.querySelector(".input-field").click();
    };

    const handleFileChange = async (event) => {

        const file = event.target.files[0];
        setFile(file)
        console.log("file:", file)

        if (file) {
            setIsUploading(true);
            setUploadColor('green');
            setShowModel(true)


        }
    };


    const uploadAndTranscribe = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET_NAME); // Cloudinary preset
            formData.append('context', `user_id=${formDataInfo.name}|user_email=${formDataInfo.email}`);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, // Cloudinary URL
                    formData
                );

                console.log('Uploaded file URL:', response.data.secure_url);
                toast.success("File uploaded successfully")
                setMessage(`Hey ${formDataInfo.name}! Thanks for uploading the file. Your model will be ready soon`)
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setIsUploading(false);
                setUploadColor('red');
                setShowModel(false)
            }
        } catch (error) {
            console.log("error:", error)
        }
    }


    const handleOnChangeFormData = (e, key) => {
        setFormDataInfo({
            ...formDataInfo,
            [key]: e.target.value
        })


    }

    console.log("user response", userResponse)


    // STT function to capture speech and send as input to model

    const recognizer = initializeRecognizer();


    const startListening = (language = "en-US") => {
        const recognizer = initializeRecognizer(language);

        console.log("detected language in STT", language)

        recognizer.recognized = async (s, e) => {
            if (e.result.reason === window.SpeechSDK.ResultReason.RecognizedSpeech) {
                const transcript = e.result.text;
                console.log("Recognized speech:", transcript);

                // Set the transcript as userResponse and trigger hfInference
                setUserResponse(transcript);
                await hfInference("", transcript); // Trigger model interaction
            } else {
                stopSTT()
                console.log("No speech could be recognized.");
            }
        };

        recognizer.startContinuousRecognitionAsync(
            () => console.log("Recognition started in language:", language),
            (err) => console.error("Error starting recognition:", err)
        );

        recognizer.canceled = () => {
            console.log("Recognition canceled.");
            recognizer.stopContinuousRecognitionAsync();
        };

        recognizer.sessionStopped = () => {
            console.log("Session stopped.");
            recognizer.stopContinuousRecognitionAsync();
        };
    };


    const stopSTT = () => {

        // const recognizer = initializeRecognizer();
        if (recognizer) {
            recognizer.stopContinuousRecognitionAsync(
                () => {
                    console.log("Speech recognition stopped successfully.");
                },
                (err) => {
                    console.error("Error stopping speech recognition:", err);
                }
            );
        } else {
            console.log("No active recognizer to stop.");
        }
    };


    const speakText = (textToSpeak, language = "en-US") => {
        try {
            console.log("detected language in TTS", language)
            const azureKey = import.meta.env.VITE_AZURE_KEY;
            const azureRegion = import.meta.env.VITE_AZURE_REGION;

            const speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);

            // Map language to neural voices
            const voices = {
                "en-US": "en-US-JennyNeural",
                "de-DE": "de-DE-KatjaNeural", // German female voice
            };

            speechConfig.speechSynthesisVoiceName = voices[language] || "en-US-JennyNeural"; // Default to English
            speechConfig.speechSynthesisLanguage = language;

            const audioConfig = window.SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
            const synthesizer = new window.SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

            synthesizer.synthesizing = (s, e) => {
                console.log("Speech synthesis in progress...");
            };

            synthesizer.synthesisCompleted = (s, e) => {
                console.log("AI stopped speaking.");
                synthesizer.close();
            };

            synthesizer.synthesisCanceled = (s, e) => {
                console.error("Speech synthesis canceled or failed:", e.errorDetails);
                synthesizer.close();
            };

            console.log("AI started speaking.");

            synthesizer.speakTextAsync(
                textToSpeak,
                () => console.log("Speech synthesis request completed successfully."),
                (error) => {
                    console.error("Error during speech synthesis:", error);
                    synthesizer.close();
                }
            );
        } catch (error) {
            console.error("Error initializing TTS:", error);
        }
    };




    return (
        <div className="chat-app">

            <div className="chat-container chatbox-container flex-col p-1 md:p-0">


                <div className="bg-bg-light chatbox  px-20 overflow-y-auto scroll-smooth pt-5 pb-32 rounded-3xl max-w-screen-xl w-full h-[80vh] mt-10">

                    <p className='text-2xl md:text-center font-semibold font-poppins max-[500px]:w-96'>What can I help you ?</p>

                    <p className=' md:text-center my-2 font-poppins max-[500px]:w-96'>{message}</p>



                    <p className='text-lg text-red-500 font-semibold my-5 font-poppins text-center max-[500px]:w-96'> {error ? error.toString() : ""}</p>

                    <ChatUI messages={messages} isProcessing={isProcessing} />

                    <div className="  w-full pb-5 ">

                        <FileUploading

                            hfInference={hfInference}
                            handleModelInputChange={handleModelInputChange}
                            handleFormClick={handleFormClick}
                            handleFileChange={handleFileChange}
                            uploadColor={uploadColor}
                            isUploading={isUploading}
                            userResponse={userResponse}
                            startListening={startListening}

                        />
                    </div>

                    {
                        showModel && <UploadModel
                            uploadAndTranscribe={uploadAndTranscribe}
                            setShowModel={setShowModel}
                            file={file}
                            handleOnChangeFormData={handleOnChangeFormData}
                            formData={formDataInfo}

                        />
                    }




                </div>
            </div>
        </div>
    )
}

export default Home
