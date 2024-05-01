import {getGraphMedia} from "@/db/services/graphMedia";
import {getVideo} from "@/db/services/videos";
import {getVideoState} from "@/services/video/base";

import {MediaIdParams} from "@/app/api/graphMedia/[mediaId]/MediaIdParams";

export const GET = async (req: Request, { params }: { params: MediaIdParams }) => {
    const graphMedia = await getGraphMedia(params.mediaId);
    if(!graphMedia) return Response.json(null, {status: 404})
    const video = await getVideo(graphMedia.id);
    if(!video) return Response.json(null, {status: 404})
    return Response.json(await getVideoState(video.video_analyzer_id));
}