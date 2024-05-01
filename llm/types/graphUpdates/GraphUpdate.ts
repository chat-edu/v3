import {NewTopic} from "@/llm/types/graphUpdates/NewTopic";
import {UpdatedTopic} from "@/llm/types/graphUpdates/UpdatedTopic";
import {NewEdge} from "@/llm/types/graphUpdates/NewEdge";
import {Stringified} from "@/types/Stringified";

export interface GraphUpdate {
    newTopics: NewTopic[],
    newEdges: NewEdge[],
    updatedTopics: UpdatedTopic[],
}

export interface StringifiedGraphUpdate {
    newTopics: Stringified<NewTopic>[],
    newEdges: Stringified<NewEdge>[],
    updatedTopics: Stringified<UpdatedTopic>[],
}