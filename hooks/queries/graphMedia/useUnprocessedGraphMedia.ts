import {useCallback, useEffect} from "react";

import useRows from "@/hooks/queries/base/useRows";
import adaptGraphMedia from "@/hooks/queries/graphMedia/adapter";

import {
    subscribeToGraphMediaChangedEvent,
    unsubscribeFromUserGraphsGraphMediaChangedEvent
} from "@/events/graphMediaChanged";

import {Graph} from "@/types/graph/Graph";

const useUnprocessedGraphMedia = (graphId: Graph["id"]) => {
    const [
        graphMedia,
        loading,
        error,
        fetchGraphMedia,
    ] = useRows(`/api/graphMedia/graph/${graphId}/unprocessed`, adaptGraphMedia);

    const handleGraphMediaChanged = useCallback((changedGraphId: Graph["id"]) => {
        if(graphId === changedGraphId) {
            fetchGraphMedia();
        }
    }, [graphId]);

    useEffect(() => {
        subscribeToGraphMediaChangedEvent(handleGraphMediaChanged);
        return () => {
            unsubscribeFromUserGraphsGraphMediaChangedEvent(handleGraphMediaChanged);
        }
    }, []);

    return {
        graphMedia,
        loading,
        error,
        fetchGraphMedia
    }
}

export default useUnprocessedGraphMedia;