
import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";
import {User} from "@/types/User";

const USER_TASKS_CHANGED_EVENT_NAME = "userTasksChanged";

export const emitUserTasksChangedEvent = (userId: User["id"]) => {
    emitEvent(USER_TASKS_CHANGED_EVENT_NAME, userId);
}

export const subscribeToUserTasksChangedEvent = (callback: (userId: User["id"]) => void) => {
    subscribeToEvent(USER_TASKS_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromUserTasksChangedEvent = (callback: (userId: User["id"]) => void) => {
    unsubscribeFromEvent(USER_TASKS_CHANGED_EVENT_NAME, callback);
}
