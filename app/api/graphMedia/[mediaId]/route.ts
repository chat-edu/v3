import {deleteGraphMedia, getGraphMedia} from "@/db/services/graphMedia";

import {MediaIdParams} from "@/app/api/graphMedia/[mediaId]/MediaIdParams";

export const GET = async (req: Request, { params }: { params: MediaIdParams }) => {
    return Response.json(await getGraphMedia(params.mediaId));
}

export const DELETE = async (req: Request, { params }: { params: MediaIdParams }) => {
    return Response.json(await deleteGraphMedia(params.mediaId));
}