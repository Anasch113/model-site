import React from 'react'
import { LuSend } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMic } from "react-icons/io5";

const FileUploading = ({
    hfInference,
    handleModelInputChange,
    handleFormClick,
    handleFileChange,
    uploadColor,
    isUploading,
    userResponse,
    startListening
}) => {
    return (
        <div className="bottom-8  right-0  left-0 max-w-screen-xl mx-auto fixed">
            <div className="flex items-center  rounded-b-3xl text-gray-950  bg-blue-100 border p-4">

                <form className='flex  w-full '>
                    <input
                        className="chat-inp focus:outline-none w-full"
                        type="text"
                        placeholder={
                            "Enter a prompt here"
                        }
                        onChange={handleModelInputChange}
                        value={userResponse}
                    />
                    <button type='submit' onClick={hfInference} ><LuSend className='' size={25} /></button>
                </form>

                <span className=' flex p-2 gap-1'>
                    <form onClick={handleFormClick} className="cursor-pointer mx-4">
                        <input
                            multiple
                            accept=".json, .pdf"
                            onChange={handleFileChange}
                            className="input-field"
                            type="file"
                            hidden
                        />
                        <FaCloudUploadAlt
                            color={uploadColor}
                            size={30}
                            className={isUploading ? 'animate-spin' : ''}
                        />

                    </form>
                    <button onClick={()=>{
                        startListening('de-DE')
                    }}>
                        <IoMic size={30} />
                    </button>
                </span>

            </div>

        </div>
    )
}

export default FileUploading
