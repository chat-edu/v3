import {generate} from "@/llm/utils";

import {getTopic} from "@/db/services/topics";

import {findIncomingTopics} from "@/app/api/topics/[topicId]/generate/utils";

import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";

export const POST = async (req: Request, { params }: { params: TopicIdParams }) => {
    const topicRow = await getTopic(params.topicId);

    if(!topicRow) return Response.json({error: "Topic not found"}, {status: 404});

    const incomingTopics = await findIncomingTopics(params.topicId);

    const prompt = `
        Your goal is to generate more content on the topic of about ${topicRow.name}.
      
        The note is part of a graph of topics. The topics that point to this from highest level to lowest level topic are: ${
            incomingTopics.map(topic => `${topic.name}: ${topic.text}`).join(", ")
        }.
  
        The topic's content is ${
            topicRow.text.length === 0
                ? "currently empty. Create content informs the reader about the topic."
                : `currently as follows: ${topicRow.text}. Continue by adding more information to the note`
        }
  
        Provide a response in Markdown format.
      
        The response should be in the following JSON format:
          
         {
            generatedContent: <string>
         }
         
         Use escape characters where necessary to ensure the JSON is valid and can be parsed.
    `.trim();

    return Response.json(await generate(prompt));
}