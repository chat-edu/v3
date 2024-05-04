import ComponentNode from "@/components/home/NotLoggedIn/LandingGraph/nodes/ComponentNode";
import SecondBrainNode from "@/components/home/NotLoggedIn/LandingGraph/nodes/SecondBrainNode";

import {NodeTypes} from "reactflow";
import {LandingNodeTypes} from "@/types/landing/LandingNodeTypes";
import UserNode from "@/components/home/NotLoggedIn/LandingGraph/nodes/UserNode";

const landingNodeTypes: NodeTypes = {
    [LandingNodeTypes.Component]: ComponentNode,
    [LandingNodeTypes.SecondBrain]: SecondBrainNode,
    [LandingNodeTypes.User]: UserNode,
}

export default landingNodeTypes;