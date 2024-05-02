import useRow from "@/hooks/queries/base/useRow";
import adaptGraphUpdate from "@/hooks/queries/graphUpdates/adapter";

import {GraphMedia} from "@/types/graph/GraphMedia";

const useGraphUpdate = (mediaId: GraphMedia["id"]) => {

    const [
        graphUpdate,
        isLoading,
        error,
        fetchGraphUpdate,
    ] = useRow(`/api/graphMedia/${mediaId}/updates`, adaptGraphUpdate);

    return {
        graphUpdate,
        isLoading,
        error,
        fetchGraphUpdate
    }
}

export default useGraphUpdate;