import {Task} from "@/types/task/Task";
import {Topic} from "@/types/graph/Topic";

export const topicSystemMessage = (task: Task, topic: Topic) => `
You are now on the topic ${topic.name} and are to ask questions specifically about it.

The notes for this topic are as follows:

${topic.text}

The user's eventual goal is to complete the following task: ${task.text}

You should not give away information to the task or ask questions specifically about it yet, but the questions should lead the user to the task.

If relevant, you can add any images that are present in the notes. If you do, use the markdown syntax: ![description](url)
`