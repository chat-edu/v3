import {TaskRow} from "@/db/types/TaskRow";
import {TopicRow} from "@/db/types/TopicRow";

export const topicChainPrompt = (
    taskRow: TaskRow,
    taskSummary: string,
    topics: TopicRow[],
    currentTopicChain: TopicRow[]
) => `
    You are to determine the chain of topics that are specifically relevant to the following learning objective: ${taskRow.text}
    
    A brief explanation of the solution to the task is as follows: ${taskSummary}
    
    The current topic chain is as follows:
    
    ${currentTopicChain.map(topic => `Name: ${topic.name}; Content: ${topic.text}`).join("\n")}
    
    The new topics to consider are as follows: ${topics.map(topic => `Name: ${topic.name}; Content: ${topic.text}`).join("\n")}
    
    Select which of the new topics are specifically relevant to the objective. Only return the NAMES of the topics that should be added and do not include any topics that are already in the chain or create new topics.
    
    The topics you select should be specifically relevant to the learning objective, not just related in general.
        
    Return the relevant topics as a list of topic names in the following JSON format:
        
    {
        relevantTopicNames: <number[]>
    }
`