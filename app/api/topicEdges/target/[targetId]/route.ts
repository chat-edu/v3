import {findIncomingTopicEdges} from "@/db/services/topicEdges";

import {TopicRow} from "@/db/types/TopicRow";

interface TargetIdParams {
    targetId: TopicRow["id"];
}

export const GET = async (req: Request, {params}: { params: TargetIdParams }) => {
    return Response.json(await findIncomingTopicEdges(params.targetId));
}