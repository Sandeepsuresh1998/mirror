export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Joi from 'joi';
import OpenAi from 'openai';
import {
    PineconeVectorStore,
    VectorStoreIndex,
    serviceContextFromDefaults,
} from "llamaindex";



const QueryRequestType = Joi.object({
    user_id: Joi.string().required(),
    prompt: Joi.string().required(),
});


export const GET = withApiAuthRequired(async function queryIndex(request: NextRequest) {


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


    const params = Object.fromEntries(request.nextUrl.searchParams);
    const {error} = QueryRequestType.validate(params);

    if (error) {
        return new NextResponse(JSON.stringify({ error: error.details[0].message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    const { user_id, prompt } = params;

    // Add a type guard to ensure prompt is a string
    if (typeof prompt !== 'string') {
        return new NextResponse(JSON.stringify({ error: "Invalid prompt" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    if (user.sub !== user_id) {
        return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    // Generate embedding of prompt with OpenAI
    const openai = new OpenAi({
        apiKey: process.env.OPENAI_API_KEY,
    });

     // Create the embedding with OpenAI
     const embeddingsResponse = await openai.embeddings.create(
        {
            input: prompt,
            model: 'text-embedding-ada-002',
        }
    );

    // Extract the embedding
    const embedding = embeddingsResponse.data[0].embedding;

    //Pinecone vectorstore
    const pcvs = new PineconeVectorStore({
        indexName: 'journal',
    });

    const ctx = serviceContextFromDefaults();
    const index = await VectorStoreIndex.fromVectorStore(pcvs, ctx);

    // Query the index
    const queryEngine = await index.asQueryEngine();

    console.log("Querying index with prompt:", prompt);

    try {
        console.log("Wooo")
        const retriever = index.asRetriever();
        console.log("Retriever:", retriever);
        const nodes = await retriever.retrieve({ query: prompt });
        console.log("Retrieved nodes:", nodes);
        const answer = await queryEngine.query({ query: prompt });
        console.log(answer.response);
        return new NextResponse(JSON.stringify({
            "answer": answer,
        }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(JSON.stringify({ error: "Error querying index" }), {
            status: 500,
        });
    }
});