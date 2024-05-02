import {findLastThreeQuestionSubmissionsByUserIdAndTopicId} from "@/db/services/questions";

import {TopicIdParams} from "@/app/api/questions/utils/TopicIdParams";

export const GET = async (req: Request, { params }: { params: TopicIdParams }) => {
    return Response.json(await findLastThreeQuestionSubmissionsByUserIdAndTopicId(params.userId, params.topicId));
}