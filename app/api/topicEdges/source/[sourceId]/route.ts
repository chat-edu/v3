import {findOutgoingTopicEdges} from "@/db/services/topicEdges";

import {TopicRow} from "@/db/types/TopicRow";

interface SourceIdParams {
    sourceId: TopicRow["id"];
}

export const GET = async (req: Request, {params}: { params: SourceIdParams }) => {
    return Response.json(await findOutgoingTopicEdges(params.sourceId));
}