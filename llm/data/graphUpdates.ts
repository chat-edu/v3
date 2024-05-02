import {NewTopic} from "@/llm/types/graphUpdates/NewTopic";
import {NewEdge} from "@/llm/types/graphUpdates/NewEdge";
import {UpdatedTopic} from "@/llm/types/graphUpdates/UpdatedTopic";

import {Stringified} from "@/types/Stringified";
import {StringifiedGraphUpdate} from "@/llm/types/graphUpdates/GraphUpdate";

export const newTopicDescription: Stringified<NewTopic> = {
    name: "string: The name of the new topic",
    text: "string: The markdown content of the new topic"
}

export const newEdgeDescription: Stringified<NewEdge> = {
    sourceTopicName: "string: The name of the source topic, which is a prerequisite for the target topic",
    targetTopicName: "string: The name of the target topic, which is dependent on the source topic"
}

export const updatedTopicDescription: Stringified<UpdatedTopic> = {
    name: "string: The name of the topic",
    updatedText: "string: The markdown content to append to the topic content"
}

export const updateGraphSchema: StringifiedGraphUpdate = {
    newTopics: [newTopicDescription],
    updatedTopics: [updatedTopicDescription],
    newEdges: [newEdgeDescription],
}