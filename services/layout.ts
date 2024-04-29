import dagre from "dagre";

import {Edge, Node, Position} from "reactflow";
import {LayoutDirections} from "@/types/graph/GraphLayout";

export const layoutGraph = (nodes: Node[], edges: Edge[], direction: LayoutDirections, nodeHeight: number, nodeWidth: number) => {

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === LayoutDirections.Horizontal;
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? Position.Left : Position.Top;
        node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

        node.position = {
            x: nodeWithPosition.x - (nodeWidth) / 2,
            y: nodeWithPosition.y - (nodeHeight) / 2,
        };

        return node;
    });

    return {
        nodes,
        edges
    }
}