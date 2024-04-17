import useRows from "@/hooks/queries/base/useRows";
import adaptTopic from "@/hooks/queries/topics/adapter";

import {Graph} from "@/types/graph/Graph";

const useGraphTopics = (graphId: Graph["id"]) => {
    const [
        topics,
        loading,
        error,
        fetchTopics
    ] = useRows(`/api/topics/graph/${graphId}`, adaptTopic);

    return {
        topics,
        loading,
        error,
        fetchTopics
    }
}

export default useGraphTopics;