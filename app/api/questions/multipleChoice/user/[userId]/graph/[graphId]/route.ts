import {findMultipleChoiceQuestionsByUserIdAndGraphId} from "@/db/services/questions";

import {GraphIdParams} from "@/app/api/questions/utils/GraphIdParams";

export const GET = async (req: Request, { params }: { params: GraphIdParams }) => {
    return Response.json(await findMultipleChoiceQuestionsByUserIdAndGraphId(params.userId, params.graphId));
}