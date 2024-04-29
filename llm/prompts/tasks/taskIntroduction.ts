import {Task} from "@/types/Task";
import {Topic} from "@/types/graph/Topic";

export const taskIntroductionMessage = (task: Task, topics: Topic[]) => `
Hello! I am looking to achieve the following learning objective: ${task.text}.

You will ask you me a sequence of questions to help me understand my objective better.

After each question, you will provide me with feedback on how well I answered the question.

Once you answer all of the questions, you will provide you with a summary of the task and ask you to complete it.

Here is the list of topics that I have identified are important to understand in order to achieve the task:

${topics.map((topic, index) => `${index + 1}) ${topic.name}: ${topic.text}`).join("\n")}

Ask me questions that will help me understand the topics listed above better in order, only moving on to the next topic once I have a good understanding of the current topic.

For each topic, start with a multiple choice question, then ask me a free response question that requires me to apply the knowledge from the multiple choice question.
`;

