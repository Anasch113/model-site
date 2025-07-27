
// https://textcleaner.net/



import OpenAI from "openai";

const openai = new OpenAI({
    "baseURL": "https://k22ttx3ko0ezf8rf.us-east-1.aws.endpoints.huggingface.cloud/v1/",
    "apiKey": "hf_XXXXX"
});

const stream = await openai.chat.completions.create({
    "model": "tgi",
    "messages": [
        {
            "role": "user",
            "content": "What is deep learning?"
        }
    ],
    "max_tokens": 150,
    "stream": false
});

for await (const chunk of stream) {
	process.stdout.write(chunk.choices[0]?.delta?.content || '');
}






// anas ch hf token: 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

// uscriber hf token: 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




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





    // const hfInference = async (e, transcript) => {
    //     // console.log("transcript", transcript)



    //     if (e.type === 'click') {
    //         e.preventDefault()
    //     }
    //     stopSTT()

    //     try {
    //         const currentUserResponse = giveUserResponse();
    //         console.log("Current user response:", transcript);

    //         setIsProcessing(true);

    //         // Add user message to the state
    //         setMessages((prevMessages) => [
    //             ...prevMessages,
    //             { role: 'user', content: transcript || currentUserResponse },
    //         ]);

    //         // Clear input (if needed)
    //         setUserResponse("");

    //         // Get model response
    //         const stream = await openai.chat.completions.create({
    //             model: "tgi",
    //             messages: [{ role: "user", content: transcript || currentUserResponse }],
    //             max_tokens: 150,
    //             stream: false,
    //         });

    //         const response = stream.choices[0]?.message?.content || "No response";

    //         console.log("Model response:", response);

    //         // Add model response to the state
    //         setMessages((prevMessages) => [
    //             ...prevMessages,
    //             { role: 'assistant', content: response },
    //         ]);
    //         speakText(response)
    //         setIsProcessing(false);
    //     } catch (error) {
    //         console.error("Error:", error);
    //         setIsProcessing(false);
    //     }
    // };
