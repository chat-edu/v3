import {Graph} from "@/types/graph/Graph";

export interface Topic {
    id: number,
    name: string,
    text: string,
    graphId: Graph["id"],
}