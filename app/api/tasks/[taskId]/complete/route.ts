import {getTask, updateTaskCompleted} from "@/db/services/tasks";

import {TaskIdParams} from "@/app/api/tasks/[taskId]/TaskIdParams";
import {generate} from "@/llm/utils";
import {generateTaskSummary} from "@/llm/prompts/tasks/createTaskSummary";
import {findFreeResponseQuestionsByTaskId, findMultipleChoiceQuestionsByTaskId} from "@/db/services/questions";
import {addTaskSummary} from "@/db/services/taskSummaries";

export const maxDuration = 300;

export const POST = async (req: Request, { params }: { params: TaskIdParams }) => {
    const success = await updateTaskCompleted(params.taskId, true);

    if(!success) return Response.json(null, {status: 404})

    const task = await getTask(params.taskId);

    if(!task) return Response.json(null, {status: 404})

    const [mcQuestions, frQuestions] = await Promise.all([
        findMultipleChoiceQuestionsByTaskId(params.taskId),
        findFreeResponseQuestionsByTaskId(params.taskId)
    ]);

    const summary = await generate(generateTaskSummary(task, [...mcQuestions, ...frQuestions]));

    if(!summary) return Response.json(null, {status: 404});

    return Response.json(await addTaskSummary({
        task_id: task.id,
        summary
    }));
}