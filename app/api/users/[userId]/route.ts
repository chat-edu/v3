import {deleteUser, getUser, updateUser} from "@/db/services/users";

import {UserRow} from "@/db/types/UserRow";

interface UserIdParams {
    userId: UserRow['id'];
}

export const GET = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await getUser(params.userId));
}

export const PATCH = async (req: Request, { params }: { params: UserIdParams }) => {
    const body = await req.json();

    const updatedFields: Partial<UserRow> = {};

    if(!body) return Response.json({error: 'No body provided'}, {status: 400});
    if(body.name) updatedFields.name = body.name;
    if(body.email) updatedFields.email = body.email;
    if(body.username) updatedFields.username = body.username;
    if(body.profile_picture_url) updatedFields.profile_picture_url = body.profile_picture_url;

    return Response.json(await updateUser(params.userId, updatedFields));
}

export const DELETE = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await deleteUser(params.userId));
}