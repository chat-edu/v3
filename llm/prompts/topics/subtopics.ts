import {TopicRow} from "@/db/types/TopicRow";

export const subtopicsPrompt = (topicRow: TopicRow, incomingTopics: TopicRow[]) => `
        Generate 3 subtopics for the topic: ${topicRow.name}.
        
        ${incomingTopics.length > 0
            ? `The topics that point to this from highest level to lowest level topic are: ${incomingTopics.map(topicRow => topicRow.name).join(", ")}.`
            : ""
        }
        
        Return the generated subtopics in the following JSON format: 
        
        {
            subtopics: string[]
        }
    `