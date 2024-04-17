import useRow from "@/hooks/queries/base/useRow";
import adaptGraph from "@/hooks/queries/graphs/adapter";

import {Graph} from "@/types/graph/Graph";

const useGraph = (graphId: Graph["id"]) => {
    const [
        graph,
        loading,
        error,
        fetchGraph
    ] = useRow(`/api/graphs/${graphId}`, adaptGraph);

    return {
        graph,
        loading,
        error,
        fetchGraph
    }
}

export default useGraph;