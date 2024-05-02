import {Task} from "@/types/task/Task";

export interface TaskSummary {
    taskId: Task['id'];
    summary: string;
}