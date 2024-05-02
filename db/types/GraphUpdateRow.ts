import {GraphMediaRow} from "@/db/types/GraphMediaRow";

import {GraphUpdate} from "@/llm/types/graphUpdates/GraphUpdate";

export interface GraphUpdateRow {
    media_id: GraphMediaRow["id"];
    updates: GraphUpdate,
}