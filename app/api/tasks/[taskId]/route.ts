import {deleteTask, getTask, updateTask} from "@/db/services/tasks";

import {TaskIdParams} from "@/app/api/tasks/[taskId]/TaskIdParams";

export const GET = async (req: Request, { params }: { params: TaskIdParams }) => {
    return Response.json(await getTask(params.taskId));
}

export const DELETE = async (req: Request, { params }: { params: TaskIdParams }) => {
    return Response.json(await deleteTask(params.taskId));
}

export const PATCH = async (req: Request, { params }: { params: TaskIdParams })=> {
    const body = await req.json();

    if(!body.text) return Response.json({error: "No text provided"}, {status: 400});

    return Response.json(await updateTask(params.taskId, body.text));
}