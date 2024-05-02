import {Task} from "@/types/task/Task";
import {Topic} from "@/types/graph/Topic";

export const agentIntroduction = (task: Task, topics: Topic[]) => `
# Hello!

I am your AI assistant here to walk you through your learning objective.

## Objective

${task.text}

## Topics

I've broken down your objective into the following topics:

${topics.map((topic, index) => `${index + 1}) ${topic.name}`).join("\n")}

I will ask you a series of questions to help you understand the topics better. At any point, feel free to ask me questions or for clarification.

`