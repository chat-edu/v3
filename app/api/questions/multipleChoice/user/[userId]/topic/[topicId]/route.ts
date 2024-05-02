import {findMultipleChoiceQuestionsByUserIdAndTopicId} from "@/db/services/questions";

import {TopicIdParams} from "@/app/api/questions/utils/TopicIdParams";

export const GET = async (req: Request, { params }: { params: TopicIdParams }) => {
    return Response.json(await findMultipleChoiceQuestionsByUserIdAndTopicId(params.userId, params.topicId));
}