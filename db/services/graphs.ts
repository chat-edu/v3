import {add, del, find, get, update} from "@/db/services/base";

import {GRAPHS_TABLE} from "@/db/tables";

import {GraphRowInput, GraphRow} from "@/db/types/GraphRow";

export const addGraph = async (graph: GraphRowInput): Promise<GraphRow | null> => {
    return add<GraphRowInput, GraphRow>(GRAPHS_TABLE, graph);
};

// READ

export const getGraph = async (id: GraphRow["id"]): Promise<GraphRow | null> => {
    const query = `SELECT * FROM ${GRAPHS_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

export const findAllGraphs = async (): Promise<GraphRow[]> => {
    return find(`SELECT * FROM ${GRAPHS_TABLE};`, []);
};

export const findGraphsByOwnerId = async (ownerId: GraphRow["creator_id"]): Promise<GraphRow[]> => {
    const query = `SELECT * FROM ${GRAPHS_TABLE} WHERE creator_id = $1;`;
    return find(query, [ownerId]);
}


// UPDATE

export const updateGraph = async (id: GraphRow["id"], updatedFields: Partial<GraphRow>): Promise<boolean> => {
    return update<Partial<GraphRow>, GraphRow>(GRAPHS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteGraph = async (id: GraphRow["id"]): Promise<boolean> => {
    return del(GRAPHS_TABLE, [id]);
};