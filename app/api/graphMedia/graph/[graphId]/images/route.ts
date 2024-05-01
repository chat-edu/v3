import {uploadGraphMedia} from "@/app/api/graphMedia/graph/[graphId]/utils";

import {findGraphMediaByGraphIdAndType} from "@/db/services/graphMedia";

import {uploadImageAndGetUrl} from "@/services/blobStorage/uploadImage";

import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {GraphIdParams} from "@/app/api/graphMedia/graph/[graphId]/GraphIdParams";

export const maxDuration = 300;

export const GET = async (req: Request, { params }: { params: GraphIdParams }) => {
    return Response.json(await findGraphMediaByGraphIdAndType(params.graphId, GraphMediaTypes.Image), { status: 200 });
}

export const POST = async (req: Request, { params }: { params: GraphIdParams }) => {

    const graphMediaRow = await uploadGraphMedia(req, params.graphId, GraphMediaTypes.Image, uploadImageAndGetUrl);

    if (!graphMediaRow) {
        return new Response(null, { status: 500 });
    }

    return new Response(JSON.stringify(graphMediaRow), { status: 200 });
}