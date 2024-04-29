import {findTaskTopicsByTaskId} from "@/db/services/taskTopics";
import {getTopic} from "@/db/services/topics";

import {TaskIdParams} from "@/app/api/topics/task/[taskId]/TaskIdParams";

export const GET = async (req: Request, { params }: { params: TaskIdParams }) => {
    const taskTopics = await findTaskTopicsByTaskId(params.taskId);
    return Response.json(await Promise.all(taskTopics.map(async taskTopic =>
        getTopic(taskTopic.topic_id))
    ));
}