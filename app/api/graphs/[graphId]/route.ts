import {GraphRow, GraphRowInput} from "@/db/types/GraphRow";
import {deleteGraph, getGraph, updateGraph} from "@/db/services/graphs";

interface GraphIdParams {
    graphId: GraphRow["id"];
}

export const GET = async (req: Request, {params}: { params: GraphIdParams }) => {
    return Response.json(await getGraph(params.graphId));
}

export const PATCH = async (req: Request, {params}: { params: GraphIdParams }) => {
    const body = await req.json();

    const updatedFields: Partial<GraphRowInput> = {};

    if(!body) return Response.json({error: "No body provided"}, {status: 400});
    if(body.name) updatedFields.name = body.name;
    if(body.creator_id) updatedFields.creator_id = body.creator_id;

    return Response.json(await updateGraph(params.graphId, updatedFields));
}

export const DELETE = async (req: Request, {params}: { params: GraphIdParams }) => {
    return Response.json(await deleteGraph(params.graphId));
}