import React, {ComponentType} from 'react';

import {NodeProps} from "reactflow";

import {FaCheck, FaTrash} from "react-icons/fa6";

import BaseNode from "@/components/graph/nodes/BaseNode";

import useGeneratedTopic from "@/hooks/graph/useGeneratedTopic";

import {Topic as TopicNodeType} from "@/types/graph/Topic";
import {Text} from "@chakra-ui/react";


const GeneratedTopicNode: ComponentType<NodeProps<TopicNodeType>> = (node) => {

    const { acceptTopic, rejectTopic } = useGeneratedTopic(node);

    return (
        <BaseNode
            nodeProps={node}
            toolbarItems={[
                {
                    icon: FaCheck,
                    onClick: acceptTopic,
                    tooltip: 'Accept Topic'
                },
                {
                    icon: FaTrash,
                    onClick: rejectTopic,
                    tooltip: 'Reject Topic'
                }
            ]}
            nodeContent={
                <Text
                    w={'100%'}
                    textAlign={'center'}
                    fontSize={'md'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                >
                    {node.data.name}
                </Text>
            }
        />
    );
};

export default GeneratedTopicNode;
