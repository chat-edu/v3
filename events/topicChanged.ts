import { emitEvent, subscribeToEvent, unsubscribeFromEvent } from "@/events/base";

import {Topic} from "@/types/graph/Topic";

const TOPIC_CHANGED_EVENT_NAME = "topicChanged";

export const emitTopicChangedEvent = (topicId: Topic["id"]) => {
    emitEvent(TOPIC_CHANGED_EVENT_NAME, topicId);
}

export const subscribeToTopicChangedEvent = (callback: (topicId: Topic["id"]) => void) => {
    subscribeToEvent(TOPIC_CHANGED_EVENT_NAME, callback);
}

export const unsubscribeFromTopicChangedEvent = (callback: (topicId: Topic["id"]) => void) => {
    unsubscribeFromEvent(TOPIC_CHANGED_EVENT_NAME, callback);
}
