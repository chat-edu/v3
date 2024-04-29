import {TaskRow} from "@/db/types/TaskRow";
import {GraphRow} from "@/db/types/GraphRow";

export const taskSummaryPrompt = (taskRow: TaskRow, graphRow: GraphRow) => `
Create a brief explanation of the solution to the following task:

Task: ${taskRow.text}

The task is part of the following graph:

Graph: ${graphRow.name}
`