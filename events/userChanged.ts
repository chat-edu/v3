import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";
import {User} from "@/types/User";

const USER_CHANGED_EVENT_NAME = "userChanged";

export const emitUserChangedEvent = (userId: User["id"]) => {
   emitEvent(USER_CHANGED_EVENT_NAME, userId);
}

export const subscribeToUserChangedEvent = (callback: (userId: User["id"]) => void) => {
    subscribeToEvent(USER_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromUserChangedEvent = (callback: (userId: User["id"]) => void) => {
    unsubscribeFromEvent(USER_CHANGED_EVENT_NAME, callback);
}
