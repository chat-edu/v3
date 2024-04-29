import {generate} from "@/llm/utils";

import {getTopic} from "@/db/services/topics";

import {findIncomingTopics} from "@/db/services/utils";

import {contentPrompt} from "@/llm/prompts/topics/content";

import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";

export const POST = async (req: Request, { params }: { params: TopicIdParams }) => {
    const topicRow = await getTopic(params.topicId);

    if(!topicRow) return Response.json({error: "Topic not found"}, {status: 404});

    const incomingTopics = await findIncomingTopics(params.topicId);

    return Response.json(await generate(contentPrompt(topicRow, incomingTopics)));
}