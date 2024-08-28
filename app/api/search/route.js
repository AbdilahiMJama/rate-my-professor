import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'

export async function POST(req) {
    const data = await req.json()

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    })
    const index = pc.Index('rag').namespace('ns1')
    const openai = new OpenAI()
  
    let query = data['text']
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: [query],
      encoding_format: 'float',
    })
  
  
    const results = await index.query({
      topK: 10,
      includeMetadata: true,
      vector: embedding.data[0].embedding,
    })
  
    let resultJson = []
    results.matches.forEach((match) => {
      if (match.score >= 0.4) {
        const newJson = {
            Professor: match.id,
            Review: match.metadata.review,
            Subject: match.metadata.subject,
            Stars: match.metadata.stars,
          }
          resultJson.push(newJson)
      }
      
    })
  
    // console.log(query)
    // console.log(results)
    // console.log("this is the result: \n", resultJson)
  
    return NextResponse.json(resultJson)
  
  }