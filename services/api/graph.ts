import {GraphRow, GraphRowInput} from "@/db/types/GraphRow";
import {emitUserGraphsChangedEvent} from "@/events/userGraphsChanged";
import {User} from "@/types/User";

export const createGraph = async (graph: GraphRowInput) =>
    fetch('/api/graphs', {
        method: 'POST',
        body: JSON.stringify(graph),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if(data) {
                emitUserGraphsChangedEvent(graph.creator_id);
                return data as GraphRow;
            } else {
                return null;
            }
        });

export const deleteGraph = async (graphId: GraphRow["id"], creatorId: User["id"]) =>
    fetch(`/api/graphs/${graphId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if(data) {
                emitUserGraphsChangedEvent(creatorId);
                return data;
            } else {
                return null;
            }
        })
        .catch(() => null);