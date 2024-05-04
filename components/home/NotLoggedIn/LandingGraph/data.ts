import {FaFile, FaRobot} from "react-icons/fa6";
import {PiGraph, PiStudent} from "react-icons/pi";
import {GrGrow} from "react-icons/gr";
import {MdOutlineAutoGraph} from "react-icons/md";

import {Edge, MarkerType, Node} from "reactflow";
import {LandingNodeTypes} from "@/types/landing/LandingNodeTypes";
import {LandingNode} from "@/types/landing/LandingNode";
import {
    componentNodeHeight, componentNodeWidth,
    parentNodeXOffset,
    parentNodeYOffset
} from "@/components/home/NotLoggedIn/LandingGraph/nodes/consts";

const edgeProps: Partial<Edge> = {
    animated: true,
    style: { stroke: '#4caf50', strokeWidth: 4 },
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#4caf50',
        width: 10,
        height: 10,
    }
};

export const topLevelNodes: Node[] = [
    {
        id: 'user',
        type: LandingNodeTypes.User,
        data: {},
        position: { x: 0, y: 0 },
    },

    {
        id: 'secondbrain',
        type: LandingNodeTypes.SecondBrain,
        data: {},
        position: { x: 0, y: 0 },
    }
]

export const topLevelEdges = [
    {
        id: 'user-secondbrain',
        source: 'user',
        target: 'secondbrain',
        ...edgeProps
    }
]

export const userNodes: Node<LandingNode>[] = [
    {
        id: 'files',
        type: LandingNodeTypes.Component,
        data: {
            title: 'Knowledge Files',
            subtitle: 'Multimodal Learning Materials',
            description: 'Knowledge Files are learning materials uploaded by users, such as videos, PDFs, podcasts, and so forth. These files form the basis for the construction of the Knowledge Graph.',
            icon: FaFile,
        },
        position: { x: 0, y: 0 },
        parentId: 'user',
    },
    {
        id: 'tasks',
        type: LandingNodeTypes.Component,
        data: {
            title: 'Learning Objectives',
            subtitle: 'Task-Based Learning Objectives',
            description: 'Students provide our agents with Learning Objectives, which are used to create interactive learning exercises that guide students toward mastery.',
            icon: GrGrow,
        },
        position: { x: 0, y: 0 },
        parentId: 'user',
    },
]

export const secondBrainNodes: Node<LandingNode>[] = [
    {
        id: 'profile',
        type: LandingNodeTypes.Component,
        data: {
            title: 'Knowledge Profile',
            subtitle: 'Dynamic Progress Tracker',
            description: 'Knowledge Profiles, structured from user-uploaded Knowledge Files and organized by Knowledge Graphs, evolve as students interact with learning exercises and meet their Learning Objectives.',
            icon: PiStudent,
        },
        position: { x: parentNodeXOffset, y: parentNodeYOffset },
        parentId: 'secondbrain',
    },
    {
        id: 'graph',
        type: LandingNodeTypes.Component,
        data: {
            title: 'Knowledge Graph',
            subtitle: 'Structured Concept Maps',
            description: 'Knowledge Graphs (KGs) organize and relate topics extracted from user-uploaded Knowledge Files. They structure each student\'s Knowledge Profile and offer step-by-step guidance towards achieving Learning Objectives.',
            icon: PiGraph,
        },
        position: { x: parentNodeXOffset, y: parentNodeYOffset * 2 + componentNodeHeight },
        parentId: 'secondbrain',
    },
    {
        id: 'agent',
        type: LandingNodeTypes.Component,
        data: {
            title: 'Learning Agents',
            subtitle: 'Copilot for Achieving Mastery',
            description: 'Learning Agents fill each learning exercise with interactive and multimodal outputs, such as images and videos. They verify the correctness of each response and provide feedback on the user\'s comprehension after each session.',
            icon: FaRobot,
        },
        position: { x: parentNodeXOffset * 2 + componentNodeWidth, y: parentNodeYOffset },
        parentId: 'secondbrain',
    },
    {
        id: 'comprehension',
        type: LandingNodeTypes.Component,
        data: {
            title: 'Comprehension Analysis',
            subtitle: 'Personalized Learning Insights',
            description: 'Learning Agents evaluate and summarize a student\'s performance on a specific task. They then update the student\'s Knowledge Profile and personalize subsequent exercises accordingly.',
            icon: MdOutlineAutoGraph,
        },
        position: { x: parentNodeXOffset * 2 + componentNodeWidth, y: parentNodeYOffset * 2 + componentNodeHeight },
        parentId: 'secondbrain',
    }
]

export const secondBrainEdges: Edge[] = [
    {
        id: 'e2',
        source: 'graph',
        target: 'profile',
        ...edgeProps
    },
    {
        id: 'e5',
        source: 'profile',
        target: 'agent',
        ...edgeProps
    },
    {
        id: 'e6',
        source: 'agent',
        target: 'comprehension',
        ...edgeProps
    },
    {
        id: 'e7',
        source: 'comprehension',
        target: 'graph',
        ...edgeProps
    }
];
