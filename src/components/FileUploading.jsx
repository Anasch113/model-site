import React from 'react'
import { LuSend } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";


const FileUploading = ({
    hfInference,
    handleModelInputChange,
    handleFormClick,
    handleFileChange,
    uploadColor,
    isUploading,
}) => {
    return (
        <div className="bottom-8  right-0  left-0 max-w-screen-xl mx-auto fixed">
            <form className="input-container border border-red-400 rounded-b-3xl text-gray-950  bg-blue-100">
                <input
                    className="chat-inp focus:outline-none"
                    type="text"
                    placeholder={
                        "Enter a prompt here"
                    }
                    onChange={handleModelInputChange}
                />
                <button type='submit' onClick={hfInference} ><LuSend className='' size={25} /></button>
                <form onClick={handleFormClick} className="cursor-pointer">
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

            </form>
        </div>
    )
}

export default FileUploading
