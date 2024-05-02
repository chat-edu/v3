import {GraphMedia} from "@/types/graph/GraphMedia";

import {GraphUpdate as GraphUpdateType} from "@/llm/types/graphUpdates/GraphUpdate";

export interface GraphUpdate {
    mediaId: GraphMedia["id"];
    updates: GraphUpdateType
}