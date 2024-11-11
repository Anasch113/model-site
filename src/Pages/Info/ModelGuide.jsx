

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { llama3DatasetType, googleColabRuntime, googleColabUpload , textEditor } from "../../assets/index"
const ModelGuide = () => {
    const navigate = useNavigate();
    const preparingDataset = [
        {
            title: '1.',
            description: 'Create the json file with name "customData.json that should have the structure like below ' ,
            img: llama3DatasetType,
            
        },

        {
            title: '2.',
            description: 'Go to the website https://textcleaner.net/ and paste your uncorrect text here. And select the option like below',
            img: textEditor
        },
        {
            title: '3.',
            description: 'Clean the text and copy it and then paste it your customData.json file.',
        }
    
    ]
    const fineTunning = [
        {
            title: '1.',
            description: 'Open the notebook, choose any of your preffered runtime and start it.',
            img: googleColabRuntime
        },
        {
            title: '2.',
            description: 'Upload your "customData.json" file and click on run all and model will be fine-tuned'
           
        },
        {
            title: '3.',
            description: 'The one thing that you will have to do during the process is sometime process will ask you to put wandb api key. So everything is setup. Just click the link, copy the key and paste it and press Enter',
        },
        {
            title: '4.',
            description: 'After fine-tunning, copy the API Url. ',
        }
        
    ]
    const responseGeneration = [
        {
            title: '1.',
            description: 'Paste the API Url.',
        },
        {
            title: '2.',
            description: 'Start chatting with the model',
        }
        
    ]

    return (
        <div className='w-full min-h-screen p-10 '>

           

           


            <h1 className='text-3xl font-sans font-bold my-5'>Guide to Train the Model on Your Custom Data</h1>

            <div className='flex flex-col ml-5 my-5 bg-bg-light rounded-xl p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>Step 1: Preparing of Dataset</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        preparingDataset.map((data, i) => (
                            <span className='flex flex-col gap-2' key={i}>

                                <span className='flex gap-2'>
                                <p className='font-semibold'>{data.title}</p>
                                <p>{data.description}</p>
                                </span>
                                <img className='w-[600px] ' src={data.img} alt="" />
                            </span>
                        ))
                    }
                    <a href='https://www.loom.com/share/340120b7ca0c49bd976cc83b5eb40e4a?sid=19bdb894-4fcd-452a-9519-9c04b1a66410' target='_main' className='underline my-4'>Loom explanation for Step 1 </a>
                </div>

            </div>

            <div className='flex flex-col ml-5 my-5 bg-bg-light rounded-xl p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>Step 2: Fine tunning of model on Google Colab</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        fineTunning.map((data, i) => (
                            <span className='flex flex-col gap-2' key={i}>

                            <span className='flex gap-2'>
                            <p className='font-semibold'>{data.title}</p>
                            <p>{data.description}</p>
                            </span>
                            <img className='w-[500px] ' src={data.img} alt="" />
                        </span>
                        ))
                    }
                </div>

                <a href='https://www.loom.com/share/67a6dbed4d254c6587e69ac1f91dcdac?sid=6ec2d900-f233-4a44-bed9-9b4da2b77f1e' target='_main' className='underline my-4'>Loom explanation for Step 2</a>
            </div>
            <div className='flex flex-col ml-5 my-5 bg-bg-light rounded-xl p-5'>
                <h1 className='text-xl font-sans font-bold my-5 '>Step 3: Response Generation from Model using Our Site</h1>

                <div className='flex flex-col gap-2 text-text-hover-color'>
                    {
                        responseGeneration.map((data, i) => (
                            <span className='flex gap-2' key={i}>
                                <p className='font-semibold'>{data.title}</p>
                                <p>{data.description}</p>
                            </span>
                        ))
                    }
                     <a href='https://www.loom.com/share/5cbb50fb2e4f4f68ba183a67d2415b57?sid=953fe0d3-58c6-478e-a75e-e2b6092b179e' target='_main' className='underline my-4'>Loom explanation for Step 3 </a>
                </div>
            </div>

          
            <button onClick={() => {
                        navigate("/")
                    }} className='p-4 bg-bg-light3 rounded-xl'> Go Back</button>
        </div>
    )
}

export default ModelGuide
