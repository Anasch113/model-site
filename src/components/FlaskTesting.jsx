import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
const FlaskTesting = () => {

    const [file, setFile] = useState("")

    console.log("file", file)


    
    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("data from server", response.data);
        toast.success("file uploaded to server")
    };



    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
    }


    return (
        <div className='flex flex-col'>

            <input type="file" onChange={handleFileChange} />
            <button className='p-4 rounded-lg bg-bg-light2 text-white' onClick={uploadFile}>upload file</button>
        </div>
    )
}

export default FlaskTesting
