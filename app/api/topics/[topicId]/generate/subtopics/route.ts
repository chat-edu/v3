import {generate} from "@/llm/utils";

import {findIncomingTopics} from "@/app/api/topics/[topicId]/generate/utils";

import {getTopic} from "@/db/services/topics";

import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";

export const POST = async (req: Request, { params }: { params: TopicIdParams }) => {

    const topicRow = await getTopic(params.topicId);
    const incomingTopicNames = (await findIncomingTopics(params.topicId)).map(topicRow => topicRow.name).join(", ");

    if(topicRow === null) {
        return Response.json({error: "Topic not found"}, {status: 404});
    }

    const prompt = `
        Generate 3 subtopics for the topic: ${topicRow.name}.
        
        ${incomingTopicNames.length > 0 
            ? `The topics that point to this from highest level to lowest level topic are: ${incomingTopicNames}.` 
            : ""
        }
        
        Return the generated subtopics in the following JSON format: 
        
        {
            subtopics: string[]
        }
    `;

    return Response.json(await generate(prompt));
}