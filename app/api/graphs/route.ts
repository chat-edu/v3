import {addGraph, findAllGraphs} from "@/db/services/graphs";

export const GET = async () => {
    return Response.json(await findAllGraphs());
}

export const POST = async (request: Request) => {
    const body = await request.json();

    if(!body) return Response.json({error: "No body provided"}, {status: 400});
    if(!body.name) return Response.json({error: "No name provided"}, {status: 400});
    if(!body.creator_id) return Response.json({error: "No creator_id provided"}, {status: 400});


    return Response.json(await addGraph({
        name: body.name,
        creator_id: body.creator_id
    }));
}