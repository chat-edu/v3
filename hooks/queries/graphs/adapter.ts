import {GraphRow} from "@/db/types/GraphRow";
import {Graph} from "@/types/graph/Graph";

const adaptGraph = (graphRow: GraphRow): Graph => ({
    id: graphRow.id,
    name: graphRow.name,
    creatorId: graphRow.creator_id
})

export default adaptGraph;