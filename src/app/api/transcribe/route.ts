import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import axios from "axios";
import FormData from "form-data";


export async function POST(request: NextRequest) {

     // Read the binary data from the request body
    const audioData = await request.arrayBuffer();

    // Prepare the form data with the audio file
    const formData = new FormData();
    // Append the buffer to the form data as a file; the filename is "audio.wav"
    formData.append("file", Buffer.from(audioData), {
        filename: "audio.wav",
        contentType: "audio/wav",
    });

    formData.append("model", "whisper-1");

    console.log(audioData)


    // Send the request to the OpenAI Whisper API
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
            'Authorization': `Bearer ${process.env.AI_KEY}`,
            ...formData.getHeaders(),
        },
    });

    if (response.status != 200) {
        console.log(response.status)
        console.log(response.data)
    }

    // Handle the response from the Whisper API
    const transcription = response.data.text;
    console.log(transcription)

    return new NextResponse(JSON.stringify({ transcription }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}