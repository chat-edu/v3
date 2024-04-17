import useRows from "@/hooks/queries/base/useRows";
import adaptGraph from "@/hooks/queries/graphs/adapter";

import {User} from "@/types/User";
import {useCallback, useEffect} from "react";
import {subscribeToUserGraphsChangedEvent} from "@/events/userGraphsChanged";

const useCreatorGraphs = (creatorId: User["id"]) => {
    const [
        graphs,
        loading,
        error,
        fetchGraphs
    ] = useRows(`/api/graphs/creator/${creatorId}`, adaptGraph);

    const handleCreatorGraphsChanged = useCallback((userId: User["id"]) => {
        if(userId === creatorId) {
            fetchGraphs();
        }
    }, [creatorId, fetchGraphs]);

    useEffect(() => {
        subscribeToUserGraphsChangedEvent(handleCreatorGraphsChanged);
        return () => {
            subscribeToUserGraphsChangedEvent(handleCreatorGraphsChanged);
        }
    }, []);

    return {
        graphs,
        loading,
        error,
        fetchGraphs
    }
}

export default useCreatorGraphs;