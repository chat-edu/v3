import {uploadGraphMedia} from "@/app/api/graphMedia/graph/[graphId]/utils";

import {findGraphMediaByGraphIdAndType} from "@/db/services/graphMedia";

import {uploadVideoAndGetUrl} from "@/services/blobStorage/uploadVideo";

import {uploadUrlAsync} from "@/services/video/base";

import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {GraphIdParams} from "@/app/api/graphMedia/graph/[graphId]/GraphIdParams";
import {addVideo} from "@/db/services/videos";

export const maxDuration = 300;

export const GET = async (req: Request, { params }: { params: GraphIdParams }) => {
    return Response.json(await findGraphMediaByGraphIdAndType(params.graphId, GraphMediaTypes.Video), { status: 200 });
}

export const POST = async (req: Request, { params }: { params: GraphIdParams }) => {

    const graphMediaRow = await uploadGraphMedia(req, params.graphId, GraphMediaTypes.Video, uploadVideoAndGetUrl);

    if (!graphMediaRow) {
        return new Response(null, { status: 500 });
    }

    const videoId = await uploadUrlAsync(graphMediaRow.name, graphMediaRow.media_url);

    if(!videoId) {
        return new Response(null, { status: 500 });
    }

    const videoRow = await addVideo({
        media_id: graphMediaRow.id,
        video_analyzer_id: videoId
    });

    if (!videoRow) {
        return new Response(null, { status: 500 });
    }

    return new Response(JSON.stringify({
        graphMediaRow,
        videoRow
    }), { status: 200 });
}