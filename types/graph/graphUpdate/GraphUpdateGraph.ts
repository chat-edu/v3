import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdge} from "@/types/graph/TopicEdge";

export interface GraphUpdateGraph {
    nodes: TopicRow[],
    edges: TopicEdge[],
}