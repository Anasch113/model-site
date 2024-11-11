import React, { useState } from 'react'
import { useEffect } from 'react'
import { Client } from "@gradio/client";
import { LuSend } from "react-icons/lu";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import { FaCloudUploadAlt } from "react-icons/fa";
import FileUploading from '../../components/FileUploading';
const Home = () => {



    const [modelResponse, setModelResponse] = useState([])
    const [userResponse, setUserResponse] = useState("");
    const [userResponse2, setUserResponse2] = useState("");
    const [isResponse, setIsResponse] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [gradioUrl, setIsGradioUrl] = useState("")
    const [userMessageSent, setUserMessageSent] = useState(false)
    const [isUploading, setIsUploading] = useState(false); // Uploading state
    const [uploadColor, setUploadColor] = useState('red'); // Button color
    const [error, setError] = useState("")

    const navigate = useNavigate()


    // onChange function

    const handleModelInputChange = (e) => {
        setUserResponse(e.target.value)
    }







    const openai = new OpenAI({
        "baseURL": import.meta.env.VITE_MODEL_INFERENCE_ENDPOINT_URL,
        "apiKey": import.meta.env.VITE_HUGGING_FACE_TOKEN,
        dangerouslyAllowBrowser: true
    });


    const hfInference = async (e) => {
        try {
            e.preventDefault()
            setIsProcessing(true)
            setUserResponse2(userResponse)
            setUserMessageSent(true)


            const stream = await openai.chat.completions.create({
                "model": "tgi",
                "messages": [
                    {
                        "role": "user",
                        "content": `${userResponse} `
                    }
                ],
                "max_tokens": 150,
                "stream": false
            });

            const response = stream.choices

            console.log("stream:", stream)

            setModelResponse(response)
            setIsResponse(true)
            // for await (const chunk of stream) {
            //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
            // }
            setIsProcessing(false)
        } catch (error) {
            console.log("error:", error)
        }
    }
    console.log("response", modelResponse)


    const handleFormClick = () => {
        document.querySelector(".input-field").click();
    };


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            setUploadColor('green');

            // Simulate file upload
            const formData = new FormData();
            formData.append('file', file);

            try {
                // await fetch('/upload', { // Your backend upload endpoint
                //     method: 'POST',
                //     body: formData,
                // });
                alert('File uploaded successfully!');
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setIsUploading(false);
                setUploadColor('red');
            }
        }
    };


    return (
        <div className="chat-app">

            <div className="chat-container chatbox-container flex-col">
                <div className='my-5 flex justify-around md:w-full max-[500px]:flex-col max-[500px]:gap-5 w-32 max-[500px]:items-center'>

                    <button onClick={() => {
                        navigate("/model-guide")
                    }} className='p-4 bg-bg-light3 rounded-xl'> Model Guide</button>

                </div>

                <div className="bg-bg-light chatbox  px-20 overflow-y-auto scroll-smooth pt-5 pb-32 rounded-3xl max-w-screen-xl w-full h-[80vh]">

                    <p className='text-2xl md:text-center font-semibold font-poppins max-[500px]:w-96'>What can I help you ?</p>

                    <p className='text-lg text-red-500 font-semibold my-5 font-poppins text-center max-[500px]:w-96'> {error ? error.toString() : ""}</p>

                    <div className="p-4 overflow-y-auto flex justify-between  flex-col" >

                        {
                            userMessageSent && <div

                                className={`message gpt"} bg-bg-light2 self-end `}
                            >

                                <div className="message-text">{userResponse2}</div>
                                <div className="message-timestamp"></div>
                            </div>
                        }



                        {
                            modelResponse.length > 0 && <div

                                className={`message gpt"} bg-bg-light2 `}
                            >

                                {
                                    modelResponse.map((data, i) => (
                                        <div key={i} className="message-text">{data.message.content}</div>
                                    ))
                                }

                                <div className="message-timestamp"></div>
                            </div>
                        }




                        {
                            isProcessing &&
                            <div className="typing">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>

                        }



                    </div>

                    <div className="  w-full pb-5 ">

                        <FileUploading

                            hfInference={hfInference}
                            handleModelInputChange={handleModelInputChange}
                            handleFormClick={handleFormClick}
                            handleFileChange={handleFileChange}
                            uploadColor={uploadColor}
                            isUploading={isUploading}

                        />
                    </div>




                </div>
            </div>
        </div>
    )
}

export default Home
