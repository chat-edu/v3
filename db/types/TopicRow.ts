import {GraphRow} from "@/db/types/GraphRow";

export interface TopicRowInput {
    name: string;
    graph_id: GraphRow['id'];
    text: string;
}

export interface TopicRow extends TopicRowInput {
    id: number;
}