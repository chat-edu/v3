import {TaskRow} from "@/db/types/TaskRow";
import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";

export const mostRelevantTopicPrompt = (
    task: TaskRow,
    graph: GraphRow,
    topics: TopicRow[]
) => `
    You are to determine the most relevant topic to the following learning objective: ${task.text}
        
    The task is part of the following graph: ${graph.name}
    
    Select the most relevant topic to the learning objective from the following list of topics. Only return the NAME of the topic that should be added and do not create a new topic.
        
    The topics to consider are as follows: 

    ${topics.map(topic => `${topic.name}`).join(",")}
        
    Return the most relevant topic name from the list as a string in the following JSON format:
        
    {
        mostRelevantTopicName: <string>
    }
`;