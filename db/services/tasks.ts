import {add, del, find, get, update} from "@/db/services/base";

import {TASKS_TABLE} from "@/db/tables";

import {TaskRow, TaskRowInput} from "@/db/types/TaskRow";
import {GraphRow} from "@/db/types/GraphRow";

export const addTask = async (task: TaskRowInput): Promise<TaskRow | null> => {
    return add<TaskRowInput, TaskRow>(TASKS_TABLE, task);
};

// READ

export const getTask = async (id: TaskRow["id"]): Promise<TaskRow | null> => {
    const query = `SELECT * FROM ${TASKS_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

export const findTasksByGraphId = async (graph_id: GraphRow["id"]): Promise<TaskRow[]> => {
    const query = `SELECT * FROM ${TASKS_TABLE} WHERE graph_id = $1;`;
    return find(query, [graph_id]);
}

export const findTasksByCreatorId = async (creator_id: TaskRow["creator_id"]): Promise<TaskRow[]> => {
    const query = `SELECT * FROM ${TASKS_TABLE} WHERE creator_id = $1 ORDER BY id DESC;`;
    return find(query, [creator_id]);
}

export const findTasksByGraphIdAndCreatorId = async (graph_id: GraphRow["id"], creator_id: TaskRow["creator_id"]): Promise<TaskRow[]> => {
    const query = `SELECT * FROM ${TASKS_TABLE} WHERE graph_id = $1 AND creator_id = $2 ORDER BY id DESC;`;
    return find(query, [graph_id, creator_id]);
}

// UPDATE

export const updateTask = async (id: TaskRow["id"], text: string): Promise<boolean> => {
    return update<Partial<TaskRow>, TaskRow>(TASKS_TABLE, [id], {
        text
    });
};

export const updateTaskCompleted = async (id: TaskRow["id"], completed: boolean): Promise<boolean> => {
    return update<Partial<TaskRow>, TaskRow>(TASKS_TABLE, [id], {
        completed
    });

}

// DELETE

export const deleteTask = async (id: TaskRow["id"]): Promise<boolean> => {
    return del(TASKS_TABLE, [id]);
};