import {GraphRow, GraphRowInput} from "@/db/types/GraphRow";
import {emitUserGraphsChangedEvent} from "@/events/userGraphsChanged";

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
