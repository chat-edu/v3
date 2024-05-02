import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";

import {Task} from "@/types/task/Task";

const TASk_CHANGED_EVENT_NAME = "taskChanged";

export const emitTaskChangedEvent = (taskId: Task["id"]) => {
    emitEvent(TASk_CHANGED_EVENT_NAME, taskId);
}

export const subscribeToTaskChangedEvent = (callback: (taskId: Task["id"]) => void) => {
    subscribeToEvent(TASk_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromTaskChangedEvent = (callback: (taskId: Task["id"]) => void) => {
    unsubscribeFromEvent(TASk_CHANGED_EVENT_NAME, callback);
}
