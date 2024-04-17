import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";
import {User} from "@/types/User";

const USER_GRAPHS_CHANGED_EVENT_NAME = "graphsChanged";

export const emitUserGraphsChangedEvent = (userId: User["id"]) => {
    emitEvent(USER_GRAPHS_CHANGED_EVENT_NAME, userId);
}

export const subscribeToUserGraphsChangedEvent = (callback: (userId: User["id"]) => void) => {
    subscribeToEvent(USER_GRAPHS_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromUserGraphsChangedEvent = (callback: (userId: User["id"]) => void) => {
    unsubscribeFromEvent(USER_GRAPHS_CHANGED_EVENT_NAME, callback);
}
