import {deleteTopic, getTopic, updateTopic} from "@/db/services/topics";

import {TopicRow, TopicRowInput} from "@/db/types/TopicRow";
import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";

export const GET = async (req: Request, {params}: { params: TopicIdParams }) => {
    return Response.json(await getTopic(params.topicId));
}

export const PATCH = async (req: Request, {params}: { params: TopicIdParams }) => {
    const body = await req.json();

    const updatedFields: Partial<TopicRowInput> = {};

    if(!body) return Response.json({error: "No body provided"}, {status: 400});
    if(body.name) updatedFields.name = body.name;
    if(body.text) updatedFields.text = body.text;

    return Response.json(await updateTopic(params.topicId, updatedFields));
}

export const DELETE = async (req: Request, {params}: { params: TopicIdParams }) => {
    return Response.json(await deleteTopic(params.topicId));
}