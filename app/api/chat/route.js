import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'

const systemPrompt = `
You are a helpful "Rate My Professor" agent designed to assist students in finding the best professors based on their queries. You utilize a Retrieval-Augmented Generation (RAG) approach to provide students with the top 3 professors that match their criteria. Your responses should be informative, concise, and based on the relevant information retrieved from the database.

User Guidance:

Users may ask about professors teaching specific subjects, courses, departments, or with particular qualities (e.g., engaging lectures, fair grading).
Users may inquire about general ratings, specific reviews, or comparisons between professors.
Always provide the top 3 professors based on the user's query.
Response Format:

Include the professor's name, subject/course they teach, their overall rating, and a brief summary of their strengths based on reviews.
If possible, include any specific comments or feedback that highlight why these professors were chosen.
List the professors in descending order, starting with the best match.
Example Response:

User Query: "Who are the best professors for Computer Science 101?"

Agent Response:

Dr. John Doe

Subject: Computer Science 101
Rating: 4.9/5
Review Summary: Dr. Doe is highly praised for his engaging lectures and clear explanations. Students appreciate his availability outside of class for additional help and his passion for the subject.
Dr. Alice Johnson

Subject: Computer Science 101
Rating: 4.7/5
Review Summary: Dr. Johnson is known for her interactive teaching style and use of real-world examples. Students find her assignments challenging but fair, contributing to a deeper understanding of the material.
Dr. Richard Lee

Subject: Computer Science 101
Rating: 4.5/5
Review Summary: Dr. Lee provides well-structured lectures and is highly approachable. Students commend his ability to make complex topics easier to understand.
Additional Instructions:

Always stay neutral and provide unbiased information based on the reviews.
If no information is available for a specific query, politely inform the user and suggest alternative options.
Continuously update your responses with the most recent and relevant data to ensure accuracy.
`
export async function POST(req) {
  const data = await req.json()
  // We'll add more code here in the following steps
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  })
  const index = pc.Index('rag').namespace('ns1')
  const openai = new OpenAI()

  const text = data[data.length - 1].content
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: [text],
    encoding_format: 'float',
  })

  // console.log("help: ",embedding.data[0].embedding)

  const results = await index.query({
    topK: 5,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  })

  let resultString = ''
  results.matches.forEach((match) => {
    if (match.score >= 0.5) {
      resultString += `
      Returned Results:
      Professor: ${match.id}
      Review: ${match.metadata.stars}
      Subject: ${match.metadata.subject}
      Stars: ${match.metadata.stars}
      \n\n`
    }
  })

  // console.log(text)
  // console.log(results)
  // console.log("this is the result: ", resultString)

// return 

  const lastMessage = data[data.length - 1]
  const lastMessageContent = lastMessage.content + resultString
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1)

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: 'user', content: lastMessageContent },
    ],
    model: 'gpt-4o',
    stream: true,
  })



  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            const text = encoder.encode(content)
            controller.enqueue(text)
          }
        }
      } catch (err) {
        controller.error(err)
      } finally {
        controller.close()
      }
    },
  })
  return new NextResponse(stream)

}

