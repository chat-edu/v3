import {add, del, find, get} from "@/db/services/base";

import {TASK_SUMMARIES_TABLE} from "@/db/tables";

import {TaskRow} from "@/db/types/TaskRow";
import {GraphRow} from "@/db/types/GraphRow";
import {TaskSummaryRow} from "@/db/types/TaskSummaryRow";

export const addTaskSummary = async (summary: TaskSummaryRow): Promise<TaskSummaryRow | null> => {
    return add<TaskSummaryRow, TaskSummaryRow>(TASK_SUMMARIES_TABLE, summary);
};

// READ

export const getTaskSummary = async (id: TaskRow["id"]): Promise<TaskRow | null> => {
    const query = `SELECT * FROM ${TASK_SUMMARIES_TABLE} WHERE task_id = $1;`;
    return get(query, [id]);
};

export const findTaskSummariesByGraphId = async (graph_id: GraphRow["id"]): Promise<TaskSummaryRow[]> => {
    const query = `
        SELECT TaskSummaries.*
        FROM TaskSummaries JOIN Tasks ON TaskSummaries.task_id = Tasks.id
        WHERE Tasks.graph_id = $1;
    `;
    return find(query, [graph_id]);
}

// DELETE

export const deleteTaskSummary = async (id: TaskRow["id"]): Promise<boolean> => {
    return del(TASK_SUMMARIES_TABLE, [id], ["task_id"]);
};