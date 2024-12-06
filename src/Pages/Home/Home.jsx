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


    const hfInference = async (e) => {


        try {
            const currentUserResponse = giveUserResponse();
            setUserResponse2(currentUserResponse)
            console.log(" current user response", currentUserResponse)
            e.preventDefault()
            setIsProcessing(true)

            setUserResponse("")
            setUserMessageSent(true)


            const stream = await openai.chat.completions.create({
                "model": "tgi",
                "messages": [
                    {
                        "role": "user",
                        "content": `${currentUserResponse} `
                    }
                ],
                "max_tokens": 150,
                "stream": false
            });

            const response = stream.choices

            console.log("response:", response)

            setModelResponse(response)


            // for await (const chunk of stream) {
            //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
            // }
            setIsProcessing(false)
        } catch (error) {
            console.log("error:", error)
        }
    }
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
    return (
        <div className="chat-app">

            <div className="chat-container chatbox-container flex-col p-1 md:p-0">


                <div className="bg-bg-light chatbox  px-20 overflow-y-auto scroll-smooth pt-5 pb-32 rounded-3xl max-w-screen-xl w-full h-[80vh] mt-10">

                    <p className='text-2xl md:text-center font-semibold font-poppins max-[500px]:w-96'>What can I help you ?</p>

                    <p className=' md:text-center my-2 font-poppins max-[500px]:w-96'>{message}</p>



                    <p className='text-lg text-red-500 font-semibold my-5 font-poppins text-center max-[500px]:w-96'> {error ? error.toString() : ""}</p>

                    <div className="p-4 overflow-y-auto flex justify-between border  flex-col" >

                        {/* user messages */}
                        {
                            userMessageSent && <div

                                className={`message gpt"} bg-bg-light2 self-end `}
                            >

                                <div className="message-text">{userResponse2}</div>
                                <div className="message-timestamp"></div>
                            </div>
                        }


                        {/* model messages */}
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



                        {/* /* processing */}
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
                            userResponse={userResponse}

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
