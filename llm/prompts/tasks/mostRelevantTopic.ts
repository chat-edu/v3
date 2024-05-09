import {TaskRow} from "@/db/types/TaskRow";
import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

export const mostRelevantTopicPrompt = (
    task: TaskRow,
    graph: GraphRow,
    topics: TopicRow[],
    edgeTopics: TopicEdgeRow[]
) => `
    You are to determine the most relevant topics to create a learning pathway to achieve the following learning objective: ${task.text}
        
    The task is part of the following graph: ${graph.name}
    
    Select the most relevant topics from the list below to create a learning pathway. The pathway should be a sequence of topics that are connected by prerequisite relationships.
        
    The topics to consider are as follows: 

    ${topics.map(topic => `${topic.name}`).join(",")}
    
    The prerequisite relationships are as follows:
   
    ${edgeTopics.map(edge => `${
        topics.find(topic => topic.id === edge.source_topic_id)} -> ${topics.find(topic => topic.id === edge.target_topic_id)}`).join(",")
    }
        
    Return the most relevant topic names from the list as a string in the following JSON format:
        
    {
        mostRelevantTopicNames: <string[]>
    }
`;