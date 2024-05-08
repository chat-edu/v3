import {TopicRow} from "@/db/types/TopicRow";

export const contentPrompt = (topicRow: TopicRow, incomingTopics: TopicRow[]) => `
    Your goal is to generate more content on the topic of about ${topicRow.name} within the context of the topics leading to it: ${incomingTopics.map(topic => topic.name).join(", ")}.
  
    The note is part of a graph of topics. The topics that point to this from highest level to lowest level topic are: ${
        incomingTopics.map(topic => `${topic.name}: ${topic.text}`).join(", ")
    }.

    The topic's content is ${
        topicRow.text.length === 0
            ? "currently empty. Create content informs the reader about the topic."
            : `currently as follows: ${topicRow.text}. Continue by adding more information to the note`
    }

    Provide a response in Markdown format.
     
     Use escape characters where necessary to ensure the JSON is valid and can be parsed.
`