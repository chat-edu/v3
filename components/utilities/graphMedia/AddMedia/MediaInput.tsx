import React, {useRef} from 'react';

import {Button, HStack, Icon} from "@chakra-ui/react";

import useAddMedia from "@/hooks/graphMedia/useAddMedia";

import {IconType} from "react-icons";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {Graph} from "@/types/graph/Graph";

interface Props {
    accept: string;
    text: string;
    icon: IconType;
    graphId: Graph['id'];
    mediaType: GraphMediaTypes;
}

const MediaInput: React.FC<Props> = ({ accept, text, icon, mediaType, graphId }) => {

    const {
        addFile,
        isFileProcessing,
    } = useAddMedia(graphId, mediaType);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => inputRef.current?.click();

    return (
        <>
            <input
                type={'file'}
                hidden
                accept={accept}
                ref={inputRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        addFile(e.target.files[0])
                    }
                }}
            />
            <HStack
                w={'100%'}
            >
                <Button
                    onClick={handleClick}
                    w={'100%'}
                    leftIcon={<Icon as={icon} />}
                    variant={'outline'}
                    border={'dashed'}
                    whiteSpace={'nowrap'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    isLoading={isFileProcessing}
                >
                    {text}
                </Button>
            </HStack>
        </>
    );
};

export default MediaInput;
