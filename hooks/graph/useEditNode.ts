import {useEffect, useState} from "react";

import {useReactFlow, NodeProps} from "reactflow";

import {Topic} from "@/types/graph/Topic";
import {updateTopic} from "@/services/api/topic";
import {useToast} from "@chakra-ui/react";

const useEditNode = (node: NodeProps<Topic>) => {

    const toast = useToast();

    const { setNodes, getNode } = useReactFlow();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [nodeName, setNodeName] = useState<string>(node.data.name);

    useEffect(() => {
        if(!node.selected) {
            setIsEditing(false);
            setNodeName(node.data.name);
        }
    }, [node.data.name, node.selected]);

    const onSave = async () => {
        const success = await updateTopic(node.data.id, {
            name: nodeName,
        });
        if(success) {
            toast({
                title: "Topic Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setNodes((nodes) => nodes.map((n) => {
                if (n.id === node.id) {
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            topic: nodeName,
                        }
                    }
                }
                return n;
            }));
            setIsEditing(false);
        } else {
            toast({
                title: "Error Updating Topic",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const onCancel = () => {
        setNodeName(node.data.name);
        setIsEditing(false);
    }

    return {
        nodeName,
        setNodeName,
        isEditing,
        setIsEditing,
        onSave,
        onCancel,
    }
}

export default useEditNode;