import {TaskRow, TaskRowInput} from "@/db/types/TaskRow";
import {emitSubjectTasksChangedEvent} from "@/events/subjectTasksChanged";
import {emitTaskChangedEvent} from "@/events/taskChanged";
import {emitUserTasksChangedEvent} from "@/events/userTasksChanged";

export const createTask = async (taskInput: TaskRowInput) =>
    fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskInput)
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            emitSubjectTasksChangedEvent(taskInput.graph_id);
            emitUserTasksChangedEvent(taskInput.creator_id);
            return data as TaskRow;
        }
        return null;
    })
    .catch(() => null);

export const completeTask = async (taskId: TaskRow["id"]) =>
    fetch(`/api/tasks/${taskId}/complete`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        if(data) {
            emitTaskChangedEvent(taskId);
        }
        return data as boolean
    })
    .catch(() => false);
