import {VideoIdParams} from "@/app/api/video/[videoId]/VideoIdParams";
import {getVideoIndexAsync} from "@/services/video/base";

export const GET = async (req: Request, {params}: { params: VideoIdParams}) => {
    return Response.json(await getVideoIndexAsync(params.videoId));
}