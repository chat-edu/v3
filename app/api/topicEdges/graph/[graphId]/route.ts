import {findTopicEdgesbyGraphId} from "@/db/services/topicEdges";

import {GraphRow} from "@/db/types/GraphRow";

interface GraphIdParams {
    graphId: GraphRow["id"];
}

export const GET = async (req: Request, {params}: { params: GraphIdParams }) => {
    return Response.json(await findTopicEdgesbyGraphId(params.graphId));
}