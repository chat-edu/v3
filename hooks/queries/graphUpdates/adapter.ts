import {GraphUpdateRow} from "@/db/types/GraphUpdateRow";
import {GraphUpdate} from "@/types/graph/graphUpdate/GraphUpdate";

const adaptGraphUpdate = (graphUpdates: GraphUpdateRow): GraphUpdate => {
    return ({
        mediaId: graphUpdates.media_id,
        updates: graphUpdates.updates,
    });
}

export default adaptGraphUpdate;