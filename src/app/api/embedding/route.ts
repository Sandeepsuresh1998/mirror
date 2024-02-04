import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Joi from 'joi';
import OpenAi from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { v4 as uuidv4 } from 'uuid';



const EmbeddingRequestType = Joi.object({
    user_id: Joi.string().required(),
    text: Joi.string().required(),
});


export const POST = withApiAuthRequired(async function createEmbedding(request: NextRequest) {

    // Auth and Validation of request body
    const user = (await getSession())?.user;
    if (!user) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const body = await request.json()
    const {error} = EmbeddingRequestType.validate(body);
    if (error) {
        return new NextResponse(JSON.stringify({ error: error.details[0].message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    const { user_id, text } = body;
    if (user.sub !== user_id) {
        return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Creation of Embedding and Upsert into Pinecone
    const openai = new OpenAi({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Create the embedding with OpenAI
    const embeddingsResponse = await openai.embeddings.create(
        {
            input: text,
            model: 'text-embedding-ada-002',
        }
    );

    // Extract the embedding
    const embedding = embeddingsResponse.data[0].embedding;

    // Upsert into vector DB
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY || '',
    });

    // Get index 
    const index = pc.index('journal');
    
    // // Upsert the embedding into index
    await index.upsert([{
        id: uuidv4(),
        values: embedding,
        metadata: {
            user_id: user_id,
            text: text,
        }
    }])

    return new NextResponse(JSON.stringify({
        "message": "Embedding created successfully",
    }), {
        status: 200,
    });
});
