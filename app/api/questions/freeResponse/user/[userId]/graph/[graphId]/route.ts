import {findFreeResponseQuestionsByUserIdAndGraphId} from "@/db/services/questions";

import {GraphIdParams} from "@/app/api/questions/utils/GraphIdParams";

export const GET = async (req: Request, { params }: { params: GraphIdParams }) => {
    return Response.json(await findFreeResponseQuestionsByUserIdAndGraphId(params.userId, params.graphId));
}