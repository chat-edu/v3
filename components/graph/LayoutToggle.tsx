import React, {useEffect} from 'react';

import {HStack, Switch, Text} from "@chakra-ui/react";

import {useReactFlow} from "reactflow";

import {useLayoutDirection} from "@/contexts/LayoutDirectionContext";

import {layoutGraph} from "@/services/layout";

import {LayoutDirections} from "@/types/graph/GraphLayout";

const LayoutToggle = () => {

    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const { direction, toggleDirection } = useLayoutDirection();

    useEffect(() => {
        const layout = layoutGraph(getNodes(), getEdges(), direction);
        setNodes(layout.nodes);
        setEdges(layout.edges);
    }, [direction]);

    return (
        <HStack>
            <Switch
                isChecked={direction === 'TB'}
                onChange={toggleDirection}
                colorScheme={'brand'}
            />
            <Text>
                {direction === LayoutDirections.Vertical ? 'Vertical' : 'Horizontal'}
            </Text>
        </HStack>
    );
};

export default LayoutToggle;
