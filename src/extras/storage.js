
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