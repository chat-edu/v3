import {TaskRow} from "@/db/types/TaskRow";

export interface TaskSummaryRow {
    task_id: TaskRow["id"];
    summary: string;
}