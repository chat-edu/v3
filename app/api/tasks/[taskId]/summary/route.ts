import {getTaskSummary} from "@/db/services/taskSummaries";

import {TaskIdParams} from "@/app/api/tasks/[taskId]/TaskIdParams";

export const GET = async (req: Request, { params }: { params: TaskIdParams }) => {
    return Response.json(await getTaskSummary(params.taskId));
}