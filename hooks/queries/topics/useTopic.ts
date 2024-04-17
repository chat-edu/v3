import useRow from "@/hooks/queries/base/useRow";
import adaptTopic from "@/hooks/queries/topics/adapter";

import {Topic} from "@/types/graph/Topic";
import {useCallback, useEffect} from "react";
import {subscribeToTopicChangedEvent, unsubscribeFromTopicChangedEvent} from "@/events/topicChanged";

const useTopic = (topicId: Topic["id"]) => {
    const [
        topic,
        loading,
        error,
        fetchTopic
    ] = useRow(`/api/topics/${topicId}`, adaptTopic);

    const handleTopicChanged = useCallback((changedTopicId: Topic["id"]) => {
        if(changedTopicId === topicId) {
            fetchTopic();
        }
    }, [topicId, fetchTopic]);

    useEffect(() => {
        subscribeToTopicChangedEvent(handleTopicChanged);
        return () => {
            unsubscribeFromTopicChangedEvent(handleTopicChanged);
        }
    }, [topicId, handleTopicChanged]);

    return {
        topic,
        loading,
        error,
        fetchTopic
    }
}

export default useTopic;