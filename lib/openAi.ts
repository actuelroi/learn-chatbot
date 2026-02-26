


import https from 'https'
import OpenAI from 'openai'



const agent = new https.Agent({
    rejectUnauthorized: false, // For development . Set to true in production
})


const customFetch = (url: RequestInfo |  URL, init?:RequestInit)=>{
    return fetch(url,{
        ...init,

        // @ts-ignore - Node.js specific
        agent: url.toString().startsWith('https') ? agent: undefined,
    })
}


export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    fetch: customFetch,
    baseURL: process.env.OPENAI_BASE_API_KEY || undefined
})



export async function summarizeMarkdown(markdown: string) {
    try{
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0.1,
            max_completion_tokens: 900,
            messages:[
                {
                    role:"system",
                    content:
                    `You are a helpful assistant that summarizes markdown content. You extract key information and present it in a concise format while preserving the original meaning.`

                },
            
                {  
                    role:"user",
                    content: `Summarize the following markdown content:\n\n${markdown}`
                  }
                ]
        })

        return completion.choices[0].message.content?.trim() ?? '';
    }catch(error){

        console.error('Error in summarization :', error)

    }
}