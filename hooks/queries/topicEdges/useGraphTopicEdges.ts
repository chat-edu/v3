import useRows from "@/hooks/queries/base/useRows";
import adaptTopicEdge from "@/hooks/queries/topicEdges/adapter";

import {Graph} from "@/types/graph/Graph";

const useGraphTopicEdges = (graphId: Graph["id"]) => {
    const [
        topicEdges,
        loading,
        error,
        fetchTopicEdges
    ] = useRows(`/api/topicEdges/graph/${graphId}`, adaptTopicEdge);

    return {
        topicEdges,
        loading,
        error,
        fetchTopicEdges
    }
}

export default useGraphTopicEdges;