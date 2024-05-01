import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {Graph} from "@/types/graph/Graph";

export interface GraphMedia {
    id: number;
    graphId: Graph["id"];
    name: string;
    mediaUrl: string;
    mediaType: GraphMediaTypes;
    processed: boolean;
}