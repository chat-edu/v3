import React, {ComponentType, useRef} from 'react';

import {Input} from "@chakra-ui/react";

import {NodeProps} from "reactflow";

import {FaCheck, FaTrash} from "react-icons/fa6";

import BaseNode from "@/components/graph/nodes/BaseNode";

import useAddedTopic from "@/hooks/graph/useAddedTopic";

import {Topic as TopicNodeType} from "@/types/graph/Topic";

const AddedTopicNode: ComponentType<NodeProps<TopicNodeType>> = (node) => {

    const {
        topicName,
        setTopicName,
        onSave,
        onCancel
    } = useAddedTopic(node);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <BaseNode
            nodeProps={node}
            toolbarItems={[
                {
                    icon: FaCheck,
                    onClick: onSave,
                    tooltip: 'Add Node'
                },
                {
                    icon: FaTrash,
                    onClick: onCancel,
                    tooltip: 'Remove Node'
                }
            ]}
            nodeContent={
                <Input
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    variant={'unstyled'}
                    textAlign={'center'}
                    placeholder={'Enter Topic Name'}
                    p={0}
                    ref={inputRef}
                    autoFocus
                />
            }
        />
    );
};

export default AddedTopicNode;
