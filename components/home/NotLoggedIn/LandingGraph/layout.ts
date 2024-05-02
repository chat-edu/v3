import dagre from "dagre";

import {Position} from "reactflow";
import {LayoutDirections} from "@/types/graph/GraphLayout";
import {
    secondBrainEdges,
    secondBrainNodes,
    topLevelEdges,
    topLevelNodes
} from "@/components/home/NotLoggedIn/LandingGraph/data";
import {landingNodeHeight, landingNodeWidth} from "@/components/home/NotLoggedIn/LandingGraph/nodes/LandingNode";
import {
    secondBrainNodeHeight,
    secondBrainNodeWidth
} from "@/components/home/NotLoggedIn/LandingGraph/nodes/SecondBrainNode";

export const layoutTopLevel = () => {

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: LayoutDirections.Horizontal });

    dagreGraph.setNode(topLevelNodes[0].id, { width: landingNodeWidth, height: landingNodeHeight });
    dagreGraph.setNode(topLevelNodes[1].id, { width: secondBrainNodeWidth, height: secondBrainNodeHeight });
    dagreGraph.setEdge('files', 'secondbrain');

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

export const layoutSecondBrain = () => {

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: LayoutDirections.Horizontal });

    secondBrainNodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: landingNodeWidth, height: landingNodeHeight });
    });
    secondBrainEdges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const nodes = dagreGraph.nodes().map((id, index) => {
        const nodeWithPosition = dagreGraph.node(id);
        return {
            ...secondBrainNodes[index],
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            position: {
                x: nodeWithPosition.x - (nodeWithPosition.width) / 2 + 25,
                y: nodeWithPosition.y - (nodeWithPosition.height) / 2 + 25,
            }
        }
    })



    return {
        nodes,
        edges: secondBrainEdges
    }
}