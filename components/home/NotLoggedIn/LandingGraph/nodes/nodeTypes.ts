import LandingNode from "@/components/home/NotLoggedIn/LandingGraph/nodes/LandingNode";
import SecondBrainNode from "@/components/home/NotLoggedIn/LandingGraph/nodes/SecondBrainNode";

import {NodeTypes} from "reactflow";
import {LandingNodeTypes} from "@/types/landing/LandingNodeTypes";

const landingNodeTypes: NodeTypes = {
    [LandingNodeTypes.LandingNode]: LandingNode,
    [LandingNodeTypes.SecondBrain]: SecondBrainNode,
}

export default landingNodeTypes;