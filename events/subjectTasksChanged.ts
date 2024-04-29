import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";

import { Graph } from "@/types/graph/Graph";

const SUBJECT_TASKS_CHANGED_EVENT = "subjectTasksChanged";

export const emitSubjectTasksChangedEvent = (graphId: Graph["id"]) => {
    emitEvent(SUBJECT_TASKS_CHANGED_EVENT, graphId);
}

export const subscribeToSubjectTasksChangedEvent = (callback: (graphId: Graph["id"]) => void) => {
    subscribeToEvent(SUBJECT_TASKS_CHANGED_EVENT, callback);
}

export const unsubscribeFromSubjectTasksChangedEvent = (callback: (graphId: Graph["id"]) => void) => {
    unsubscribeFromEvent(SUBJECT_TASKS_CHANGED_EVENT, callback);
}
