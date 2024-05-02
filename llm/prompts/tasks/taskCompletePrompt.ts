import {Task} from "@/types/task/Task";

export const taskComplete = (task: Task) => `
# Learning Objective Complete!

Congratulations! You have successfully learned all of the material for this learning objective.

**${task.text}**

Is there anything else I can help you with?
`