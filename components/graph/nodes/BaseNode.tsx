import React from 'react';

import {Card, HStack} from "@chakra-ui/react";

import {Handle, NodeProps, NodeToolbar, Position} from "reactflow";

import ToolbarButton from "@/components/graph/nodes/ToolbarButton";

import {Topic as TopicNodeType} from "@/types/graph/Topic";
import {ToolbarButtonProps} from "@/types/graph/ToolbarButtonProps";
import {useLayoutDirection} from "@/contexts/LayoutDirectionContext";

export const nodeWidth = 250;
export const nodeHeight = 50;

interface Props {
    nodeProps: NodeProps<TopicNodeType>,
    toolbarItems: ToolbarButtonProps[],
    nodeContent: React.ReactNode,
    onDoubleClick?: () => void
}

const BaseNode: React.FC<Props> = ({ nodeProps, toolbarItems, nodeContent, onDoubleClick }) => {

    const { direction } = useLayoutDirection();

    return (
        <>
            <Handle
                type="source"
                position={direction === 'TB' ? Position.Bottom : Position.Right}
            />
            <Handle
                type="target"
                position={direction === 'TB' ? Position.Top : Position.Left}
            />
            <NodeToolbar
                position={Position.Top}
            >
                <HStack
                    w={'100%'}
                >
                    {
                        toolbarItems.map((item, index) => (
                            <ToolbarButton
                                key={index}
                                {...item}
                            />
                        ))
                    }
                </HStack>
            </NodeToolbar>
            <Card
                borderColor={nodeProps.selected ? ' brand.500' : 'gray.500'}
                transition={'all 0.2s ease-in-out'}
                _hover={{
                    borderColor: 'brand.500',
                    shadow: 'md'
                }}
                w={`${nodeWidth}px`}
                h={`${nodeHeight}px`}
                p={0}
                px={2}
                justifyContent={'center'}
                onDoubleClick={onDoubleClick}
            >
                {nodeContent}
            </Card>
        </>
    );
};

export default BaseNode;
