import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";

import { Graph } from "@/types/graph/Graph";

const GRAPH_TOPICS_CHANGED_EVENT_NAME = "graphTopicsChanged";

export const emitGraphTopicsChangedEvent = (graphId: Graph["id"]) => {
    emitEvent(GRAPH_TOPICS_CHANGED_EVENT_NAME, graphId);
}

export const subscribeToGraphTopicsChangedEvent = (callback: (graphId: Graph["id"]) => void) => {
    subscribeToEvent(GRAPH_TOPICS_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromUserGraphsGraphTopicsChangedEvent = (callback: (graphId: Graph["id"]) => void) => {
    unsubscribeFromEvent(GRAPH_TOPICS_CHANGED_EVENT_NAME, callback);
}
