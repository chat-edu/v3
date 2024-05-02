import {getGraphUpdate} from "@/db/services/graphUpdates";

import {MediaIdParams} from "@/app/api/graphMedia/[mediaId]/MediaIdParams";

export const GET = async (req: Request, { params }: { params: MediaIdParams }) => {
    return Response.json(await getGraphUpdate(params.mediaId));
}