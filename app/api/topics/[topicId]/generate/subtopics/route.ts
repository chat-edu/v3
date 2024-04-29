import {generate} from "@/llm/utils";

import {findIncomingTopics} from "@/db/services/utils";

import {getTopic} from "@/db/services/topics";

import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";
import {subtopicsPrompt} from "@/llm/prompts/topics/subtopics";

export const POST = async (req: Request, { params }: { params: TopicIdParams }) => {

    const topicRow = await getTopic(params.topicId);
    const incomingTopics = await findIncomingTopics(params.topicId)

    if(topicRow === null) {
        return Response.json({error: "Topic not found"}, {status: 404});
    }

    return Response.json(await generate(subtopicsPrompt(topicRow, incomingTopics)));
}