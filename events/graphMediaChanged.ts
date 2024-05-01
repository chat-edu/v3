import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";

import { Graph } from "@/types/graph/Graph";

const GRAPH_MEDIA_CHANGED_EVENT_NAME = "graphMediaChanged";

export const emitGraphMediaChangedEvent = (graphId: Graph["id"]) => {
    emitEvent(GRAPH_MEDIA_CHANGED_EVENT_NAME, graphId);
}

export const subscribeToGraphMediaChangedEvent = (callback: (graphId: Graph["id"]) => void) => {
    subscribeToEvent(GRAPH_MEDIA_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromUserGraphsGraphMediaChangedEvent = (callback: (graphId: Graph["id"]) => void) => {
    unsubscribeFromEvent(GRAPH_MEDIA_CHANGED_EVENT_NAME, callback);
}
