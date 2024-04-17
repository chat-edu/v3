import {addTopicEdge, deleteTopicEdge} from "@/db/services/topicEdges";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body) return Response.json({error: "No body provided"}, {status: 400});
    if(!body.source_topic_id) return Response.json({error: "No source_topic_id provided"}, {status: 400});
    if(!body.target_topic_id) return Response.json({error: "No target_topic_id provided"}, {status: 400});

    return Response.json(await addTopicEdge({
        source_topic_id: body.source_topic_id,
        target_topic_id: body.target_topic_id,
    }));
}

export const DELETE = async (req: Request) => {
    const body = await req.json();

    if(!body) return Response.json({error: "No body provided"}, {status: 400});
    if(!body.source_topic_id) return Response.json({error: "No source_topic_id provided"}, {status: 400});
    if(!body.target_topic_id) return Response.json({error: "No target_topic_id provided"}, {status: 400});

    return Response.json(await deleteTopicEdge(body.source_topic_id, body.target_topic_id));
}