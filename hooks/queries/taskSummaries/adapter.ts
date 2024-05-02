import {TaskSummary} from "@/types/task/TaskSummary";
import {TaskSummaryRow} from "@/db/types/TaskSummaryRow";

const adaptTaskSummary = (taskSummary: TaskSummaryRow): TaskSummary => ({
    taskId: taskSummary.task_id,
    summary: taskSummary.summary
})

export default adaptTaskSummary;