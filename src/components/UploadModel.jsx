import React from 'react'
import { CiShare2 } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import toast from "react-hot-toast"
import { RiDeleteBin6Line } from "react-icons/ri";
const UploadModel = ({  setShowModel, file, handleOnChangeFormData, formData }) => {

    console.log("form data", formData.name)

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ">
            <div className="bg-bg-light md:min-h-[270px] md:min-w-[500px] p-5 rounded-xl ">

                <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                    <span className='flex  flex-row items-center gap-2'>
                        {/* <RiDeleteBin6Line className='text-2xl' /> */}
                        <h1 className='md:text-2xl font-semibold font-poppins '> Upload File</h1>
                    </span>

                    <MdClose onClick={() => setShowModel(false)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-900 p-2 rounded-full ' size={25} />

                </div>





                <div className='flex flex-col my-2 gap-1 p-2'>
                    <p className='  font-medium  font-poppins'> <span className=''>File Name: </span>{file.name}</p>
                    <span className='w-full flex flex-col p-2 gap-5'>

                        <span className='flex flex-col gap-2  p-2'>
                            <label className='text-sm' htmlFor="email">User Name</label>

                            <input required value={formData.name} onChange={(e) => {
                                handleOnChangeFormData(e, "name")
                            }} placeholder="Name" type="text" className='px-3 py-2 md:w-2/3   bg-bg-light2 rounded-sm outline-none max-[550px]:mx-3' />

                        </span>
                        <span className='flex flex-col gap-2  p-2'>
                            <label className='text-sm' htmlFor="email">Email</label>

                            <input required value={formData.email} onChange={(e) => {
                                handleOnChangeFormData(e, "email")
                            }} placeholder="Email" type="text" className='px-3 py-2 md:w-2/3  bg-bg-light2  rounded-sm outline-none max-[550px]:mx-3' />
                        </span>
                        <button  className='text-center md:px-5 md:py-3 w-full h-14
rounded-md bg-blue-500 text-white text-xl font-medium font-roboto hover:bg-blue-400 '><span className='flex items-center text-center justify-center gap-2'>
                                <p>Upload </p>
                            </span></button>


                    </span>
                </div>





            </div>
        </div>
    )
}

export default UploadModel
