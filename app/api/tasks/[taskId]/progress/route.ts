import {findTaskTopicsByTaskId} from "@/db/services/taskTopics";
import {findLastThreeQuestionSubmissionsByUserIdAndTopicId} from "@/db/services/questions";
import {getTask} from "@/db/services/tasks";

import {TaskIdParams} from "@/app/api/tasks/[taskId]/TaskIdParams";

export const GET = async (req: Request, { params }: { params: TaskIdParams }) => {

    console.log(params.taskId)

    const task = await getTask(params.taskId);

    if(!task) return Response.json(null, {status: 404});

    const taskTopics = await findTaskTopicsByTaskId(task.id);

    const lastThree = await Promise.all(taskTopics.map(async (taskTopic) => {
        return await findLastThreeQuestionSubmissionsByUserIdAndTopicId(task.creator_id, taskTopic.topic_id);
    }));

    return Response.json({
        numCorrect: lastThree.reduce((acc, curr) =>
            acc + curr.filter(question => question.correct).length, 0),
        numTotal: lastThree.length * 3
    });
}