import {add, del, find} from "@/db/services/base";

import {TASK_TOPICS_TABLE} from "@/db/tables";

import {TaskTopicRow} from "@/db/types/TaskTopicRow";
import {TaskRow} from "@/db/types/TaskRow";

export const addTaskTopic = async (taskTopic: TaskTopicRow): Promise<TaskTopicRow | null> => {
    return add<TaskTopicRow, TaskTopicRow>(TASK_TOPICS_TABLE, taskTopic);
};

// READ

export const findTaskTopicsByTaskId = async (task_id: TaskRow["id"]): Promise<TaskTopicRow[]> => {
    const query = `SELECT * FROM ${TASK_TOPICS_TABLE} WHERE task_id = $1;`;
    return find(query, [task_id]);
}

// DELETE

export const deleteTaskTopic = async (taskTopic: TaskTopicRow): Promise<boolean> => {
    return del(TASK_TOPICS_TABLE, [taskTopic.task_id, taskTopic.topic_id], ["task_id", "topic_id"]);
};