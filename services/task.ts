import {TaskRow, TaskRowInput} from "@/db/types/TaskRow";
import {emitSubjectTasksChangedEvent} from "@/events/subjectTasksChanged";

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
            emitSubjectTasksChangedEvent(data.task.graph_id);
            return data as TaskRow;
        }
        return null;
    })
    .catch(() => null);
