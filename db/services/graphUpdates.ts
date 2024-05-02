
import {add, del, get} from "@/db/services/base";

import {GRAPH_UPDATES_TABLE} from "@/db/tables";

import {GraphUpdateRow} from "@/db/types/GraphUpdateRow";

export const addGraphUpdate = async (graphUpdate: GraphUpdateRow): Promise<GraphUpdateRow | null> => {
    return add<GraphUpdateRow, GraphUpdateRow>(GRAPH_UPDATES_TABLE, graphUpdate);
};

// READ

export const getGraphUpdate = async (id: GraphUpdateRow["media_id"]): Promise<GraphUpdateRow | null> => {
    const query = `SELECT * FROM ${GRAPH_UPDATES_TABLE} WHERE media_id = $1;`;
    return get(query, [id]);
};

// DELETE

export const deleteVideo = async (id: GraphUpdateRow["media_id"]): Promise<boolean> => {
    return del(GRAPH_UPDATES_TABLE, [id], ["media_id"]);
};