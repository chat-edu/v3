import {addUser, findAllUsers} from "@/db/services/users";

export const GET = async () => {
    return Response.json(await findAllUsers());
}

export const POST = async (req: Request) => {

    const body = await req.json();

    if(!body) return Response.json({error: 'No body provided'}, {status: 400});
    if(!body.name) return Response.json({error: 'No name provided'}, {status: 400});
    if(!body.email) return Response.json({error: 'No email provided'}, {status: 400});
    if(!body.username) return Response.json({error: 'No username provided'}, {status: 400});
    if(!body.profile_picture_url) return Response.json({error: 'No profile_picture_url provided'}, {status: 400});

    return Response.json(await addUser({
        id: body.id,
        name: body.name,
        email: body.email,
        username: body.username,
        profile_picture_url: body.profile_picture_url
    }));
}