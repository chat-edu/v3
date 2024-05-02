import NewTopicNode from "@/components/utilities/graphMedia/GraphUpdates/NewTopicNode";
import UpdatedTopicNode from "@/components/utilities/graphMedia/GraphUpdates/UpdatedTopicNode";
import ExistingTopicNode from "@/components/utilities/graphMedia/GraphUpdates/ExistingTopicNode";

import {GraphUpdateNodeTypes} from "@/types/graph/graphUpdate/GraphUpdateNodeTypes";

export const nodeTypes = {
    [GraphUpdateNodeTypes.New]: NewTopicNode,
    [GraphUpdateNodeTypes.Updated]: UpdatedTopicNode,
    [GraphUpdateNodeTypes.Existing]: ExistingTopicNode,
}