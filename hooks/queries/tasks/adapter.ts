import {TaskRow} from "@/db/types/TaskRow";
import {Task} from "@/types/task/Task";

const adaptTask = (task: TaskRow): Task => ({
    id: task.id,
    text: task.text,
    graphId: task.graph_id,
    creatorId: task.creator_id,
    completed: task.completed
})

export default adaptTask;