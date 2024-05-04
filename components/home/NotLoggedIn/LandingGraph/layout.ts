import dagre from "dagre";

import {Position} from "reactflow";
import {LayoutDirections} from "@/types/graph/GraphLayout";
import {topLevelEdges, topLevelNodes, userNodes} from "@/components/home/NotLoggedIn/LandingGraph/data";
import {
    componentNodeHeight,
    componentNodeWidth,
    parentNodeXOffset, parentNodeYOffset
} from "@/components/home/NotLoggedIn/LandingGraph/nodes/consts";
import {
    parentNodeHeight,
    secondBrainNodeWidth,
    userNodeWidth
} from "@/components/home/NotLoggedIn/LandingGraph/nodes/consts";

export const layoutTopLevel = () => {

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: LayoutDirections.Horizontal });

    dagreGraph.setNode(topLevelNodes[0].id, { width: userNodeWidth, height: parentNodeHeight });
    dagreGraph.setNode(topLevelNodes[1].id, { width: secondBrainNodeWidth, height: parentNodeHeight });
    dagreGraph.setEdge(topLevelEdges[0].source, topLevelEdges[0].target);

    dagre.layout(dagreGraph);

    const nodes = dagreGraph.nodes().map((id, index) => {
        const nodeWithPosition = dagreGraph.node(id);
        return {
            ...topLevelNodes[index],
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            position: {
                x: nodeWithPosition.x - (nodeWithPosition.width) / 2,
                y: nodeWithPosition.y - (nodeWithPosition.height) / 2,
            }
        }
    })

    return {
        nodes,
        edges: topLevelEdges
    }
}

export const layoutUser = () => {

        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        dagreGraph.setGraph({ rankdir: LayoutDirections.Horizontal });

        userNodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: componentNodeWidth, height: componentNodeHeight });
        });

        dagre.layout(dagreGraph);

        const nodes = dagreGraph.nodes().map((id, index) => {
            const nodeWithPosition = dagreGraph.node(id);
            return {
                ...userNodes[index],
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
                position: {
                    x: nodeWithPosition.x - (nodeWithPosition.width) / 2 + parentNodeXOffset,
                    y: nodeWithPosition.y - (nodeWithPosition.height) / 2 + parentNodeYOffset,
                }
            }
        })

        return {
            nodes,
            edges: topLevelEdges
        }
}