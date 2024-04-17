import {addTopic, getTopic, findTopicsByGraphId} from "@/db/services/topics";

import {GraphRow, GraphRowInput} from "@/db/types/GraphRow";

interface GraphIdParams {
    graphId: GraphRow["id"];
}

export const GET = async (req: Request, {params}: { params: GraphIdParams }) => {
    return Response.json(await findTopicsByGraphId(params.graphId));
}

export const POST = async (request: Request, {params}: { params: GraphIdParams }) => {
    const body = await request.json();

    if(!body) return Response.json({error: "No body provided"}, {status: 400});
    if(!body.name) return Response.json({error: "No name provided"}, {status: 400});
    if(body.text === undefined) return Response.json({error: "No text provided"}, {status: 400});

    return Response.json(await addTopic({
        name: body.name,
        graph_id: params.graphId,
        text: body.text
    }));
}