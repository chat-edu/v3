import {GraphMediaRow} from "@/db/types/GraphMediaRow";
import {GraphMedia} from "@/types/graph/GraphMedia";

const adaptGraphMedia = (graphMedia: GraphMediaRow): GraphMedia => ({
    id: graphMedia.id,
    graphId: graphMedia.graph_id,
    name: graphMedia.name,
    mediaUrl: graphMedia.media_url,
    mediaType: graphMedia.media_type,
    processed: graphMedia.processed,
})

export default adaptGraphMedia;