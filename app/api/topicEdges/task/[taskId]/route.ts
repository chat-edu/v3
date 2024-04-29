import {findTaskTopicsByTaskId} from "@/db/services/taskTopics";
import {findTopicEdgesByTopicIds} from "@/db/services/topicEdges";

import {TaskIdParams} from "@/app/api/tasks/[taskId]/TaskIdParams";

export const GET = async (req: Request, { params }: { params: TaskIdParams }) => {
    const taskTopics = await findTaskTopicsByTaskId(params.taskId);
    const taskTopicIds = taskTopics.map(taskTopic => taskTopic.topic_id);
    return Response.json(await findTopicEdgesByTopicIds(taskTopicIds));
}