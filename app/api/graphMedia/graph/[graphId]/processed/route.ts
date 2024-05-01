import {findProcessedGraphMediaByGraphId} from "@/db/services/graphMedia";

import {GraphIdParams} from "@/app/api/graphMedia/graph/[graphId]/GraphIdParams";

export const GET = async (req: Request, { params } : { params: GraphIdParams }) => {
    return Response.json(await findProcessedGraphMediaByGraphId(params.graphId));
}