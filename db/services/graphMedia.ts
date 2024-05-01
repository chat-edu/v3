import {add, del, find, get, update} from "@/db/services/base";

import {GRAPH_MEDIA_TABLE} from "@/db/tables";

import {GraphMediaRow, GraphMediaRowInput} from "@/db/types/GraphMediaRow";

export const addGraphMedia = async (graphMedia: GraphMediaRowInput): Promise<GraphMediaRow | null> => {
    return add<GraphMediaRowInput, GraphMediaRow>(GRAPH_MEDIA_TABLE, graphMedia);
};

// READ

export const getGraphMedia = async (id: GraphMediaRow["id"]): Promise<GraphMediaRow | null> => {
    const query = `SELECT * FROM ${GRAPH_MEDIA_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

export const findGraphMediaByGraphId = async (graph_id: GraphMediaRow["graph_id"]): Promise<GraphMediaRow[]> => {
    const query = `SELECT * FROM ${GRAPH_MEDIA_TABLE} WHERE graph_id = $1;`;
    return find(query, [graph_id]);
}

export const findUnprocessedGraphMediaByGraphId = async (graph_id: GraphMediaRow["graph_id"]): Promise<GraphMediaRow[]> => {
    const query = `SELECT * FROM ${GRAPH_MEDIA_TABLE} WHERE graph_id = $1 AND processed = false;`;
    return find(query, [graph_id]);
}

export const findProcessedGraphMediaByGraphId = async (graph_id: GraphMediaRow["graph_id"]): Promise<GraphMediaRow[]> => {
    const query = `SELECT * FROM ${GRAPH_MEDIA_TABLE} WHERE graph_id = $1 AND processed = true;`;
    return find(query, [graph_id]);

}

export const findGraphMediaByGraphIdAndType = async (graph_id: GraphMediaRow["graph_id"], media_type: GraphMediaRow["media_type"]): Promise<GraphMediaRow[]> => {
    const query = `SELECT * FROM ${GRAPH_MEDIA_TABLE} WHERE graph_id = $1 AND media_type = $2;`;
    return find(query, [graph_id, media_type]);
}


// UPDATE

export const updateGraphMedia = async (id: GraphMediaRow["id"], updatedFields: Partial<GraphMediaRow>): Promise<boolean> => {
    return update<Partial<GraphMediaRow>, GraphMediaRow>(GRAPH_MEDIA_TABLE, [id], updatedFields);
};

// DELETE

export const deleteGraphMedia = async (id: GraphMediaRow["id"]): Promise<boolean> => {
    return del(GRAPH_MEDIA_TABLE, [id]);
};