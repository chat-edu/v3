import {useReactFlow, Node, Edge, NodeProps} from "reactflow";
import {NodeTypes} from "@/types/graph/NodeTypes";
import {useLayoutDirection} from "@/contexts/LayoutDirectionContext";
import {layoutGraph} from "@/services/layout";
import {Topic} from "@/types/graph/Topic";
import {newTopicId} from "@/services/api/topic";
import {nodeHeight, nodeWidth} from "@/components/graph/nodes/BaseNode";

const useAddTopic = (parentNode: NodeProps<Topic>) => {

    const {
        getNodes,
        setNodes,
        getEdges,
        setEdges
    } = useReactFlow();

    const { direction } = useLayoutDirection();

    const addTopic = () => {
        const nodes = getNodes();
        const edges = getEdges();
        const newNodeId = newTopicId();
        const newNodes: Node<Topic>[] = [
            ...nodes,
            {
                id: newNodeId.toString(),
                position: { x: 0, y: 0 },
                data: {
                    id: newNodeId,
                    name: '',
                    graphId: parentNode.data.graphId,
                    text: '',
                },
                type: NodeTypes.AddedTopic
            }
        ];
        const newEdges: Edge[] = [
            ...edges,
            {
                id: `e${parentNode.id}-${newNodeId}`,
                source: parentNode.id,
                target: newNodeId.toString(),
            }
        ]
        const layout = layoutGraph(newNodes, newEdges, direction, nodeHeight, nodeWidth);
        setNodes(layout.nodes);
        setEdges(layout.edges);
    }

    return {
        addTopic
    };
}

export default useAddTopic;